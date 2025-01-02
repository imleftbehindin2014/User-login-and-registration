const Roles = Object.freeze({
    ADMIN: "Admin",
    STUDENT: "Student",
    FACULTY: "Faculty",
    GUEST: "Guest"
});

const Languages = Object.freeze({
    ENGLISH: "English",
    FRENCH: "French"
});

const DisplayThemes = Object.freeze({
    DARK: "Dark",
    BRIGHT: "Bright"
});

class Preferences {
    constructor(displayTheme, language, fontSize) {
        this.displayTheme = displayTheme;
        this.language = language;
        this.fontSize = fontSize;
    }
}

class Privacy {
    constructor(profileVisibility, onlineStatus, lastOnline, blockedUsers) {
        this.profileVisibility = profileVisibility;
        this.onlineStatus = onlineStatus;
        this.lastOnline = lastOnline;
        this.blockedUsers = blockedUsers;
    }
}

class Profile {
    constructor(biography, interests, skills, profilePic, preferences = new Preferences(DisplayThemes.BRIGHT, Languages.ENGLISH, "medium"), privacy = new Privacy(true, true, new Date(), [])) {
        this.biography = biography;
        this.interests = interests;
        this.skills = skills;
        this.profilePic = profilePic;
        this.preferences = preferences;
        this.privacy = privacy;
    }
}

class User {
    constructor(userid, firstname, lastname, username, email, password, profile, roles) {
        this.userid = userid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profile = profile;
        this.roles = roles;
    }
}

export { Roles, Languages, DisplayThemes, Preferences, Privacy, Profile, User };