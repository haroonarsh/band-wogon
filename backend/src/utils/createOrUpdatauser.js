import User from "../models/user.model";

const createOrUpdateUser = async (user, account, profile) => {
    const profileImage = account.provider === 'google' ? profile.picture : user.profileImage;
    let existingUser = await User.findOne({ email: user.email });
  
    if (!existingUser) {
      existingUser = new User({
        email: user.email,
        name: profile.name || user.name,
        username: user.username || `user_${account.providerAccountId}`,
        profileImage: profileImage || null,
        googleId: account.provider === 'google' ? account.providerAccountId : "",
        location: profile?.location || "Unknown",
      });
      await existingUser.save();
    } else if (account.provider === 'google' && !existingUser.profileImage) {
      existingUser.profileImage = profileImage;
      await existingUser.save();
    }
  
    return existingUser;
  };
  
export default createOrUpdateUser;