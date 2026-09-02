export const getProfile = async (req, res) =>{
    res.status(200).json({
        userId: req.user.userId,
        role: req.user.role
    });
};