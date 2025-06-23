// @ts-nocheck
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import MenuBar from '../../../components/MenuBar';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { ExtendedImage } from '../../../extensions/ExtendedImage';

import TurndownService from 'turndown';

const BlogEditor = ({ content, setContent }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({ openOnClick: false }),
			Image.configure({
				HTMLAttributes: {
					class: 'blog-image',
				},
			}),
			Heading.configure({ levels: [1, 2, 3] }),
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			BulletList,
			OrderedList,
			ListItem,
			TextStyle,
			Color,
		],
		content: content || '',
		autofocus: true,
		onUpdate({ editor }) {
			const html = editor.getHTML();
			setContent(html);
		},
		editorProps: {
			handlePaste(view, event) {
				const clipboardData = event.clipboardData;
				if (!clipboardData) return false;

				const html = clipboardData.getData('text/html');
				if (!html) return false;

				event.preventDefault();

				const markdown = convertGoogleDocHTMLToMarkdown(html);
				editor.commands.insertContent(markdown);
				return true;
			},
		},
	});

	const convertGoogleDocHTMLToMarkdown = (html) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');

		// Remove duplicate title or unwanted horizontal rule under heading
		const heading = doc.querySelector('h1, h2');
		if (heading) {
			const next = heading.nextElementSibling;
			if (next?.tagName === 'HR') next.remove();
			if (next && next.textContent.trim() === heading.textContent.trim()) {
				next.remove();
			}
		}

		// Remove metadata and unwanted tags
		doc
			.querySelectorAll('meta, style, font, o\\:p')
			.forEach((el) => el.remove());

		const turndownService = new TurndownService({
			headingStyle: 'atx',
			bulletListMarker: '-',
			codeBlockStyle: 'fenced',
		});

		// Enable strikethrough and tables if needed
		turndownService.addRule('strikethrough', {
			filter: ['del', 's', 'strike'],
			replacement: function (content) {
				return '~~' + content + '~~';
			},
		});

		return turndownService.turndown(doc.body.innerHTML);
	};

	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content, false);
		}
	}, [content, editor]);

	return (
		<div
			className='border rounded-md p-4 min-h-screen px-4 py-8'
			style={{
				backgroundColor: 'var(--bg-color)',
				color: 'var(--text-color)',
				borderColor: 'var(--border-color)',
			}}
		>
			{editor && (
				<div className='sticky top-[120px] z-50 bg-[var(--input-bg)] border-b border-[var(--border-color)]'>
					<MenuBar editor={editor} />
				</div>
			)}

			<EditorContent
				editor={editor}
				className='editor-content'
				style={{
					backgroundColor: 'var(--input-bg)',
					color: 'var(--text-color)',
					padding: '1rem',
					borderRadius: '8px',
					border: '1px solid var(--border-color)',
					minHeight: '300px',
				}}
			/>
		</div>
	);
};

export default BlogEditor;
