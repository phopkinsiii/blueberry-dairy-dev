const createUserResponse = (user) => {
	return {
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		role: user.role,
		token: user.token,
		createdAt: user.createdAt,
	};
};

export default createUserResponse;

