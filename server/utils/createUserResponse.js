const createUserResponse = (user) => {
	return {
		id: user._id,
		name: user.name,
		email: user.email,
		role: user.role,
		token: user.token,
		createdAt: user.createdAt,
	};
};

export default createUserResponse;
