export const checkPermissions = (requestUserId, resourceUserId, res) => {
  if (requestUserId === resourceUserId.toString()) return;
  res.status(400).json({ err: "User is not authorized to access this route" });
};
