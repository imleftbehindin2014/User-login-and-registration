import React, { createContext, useContext, useState, useEffect } from 'react';

const en = {
  navigation: {
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout'
  },
  dateTime: {
    currentUser: 'Current User',
    currentTime: 'Current Date and Time (UTC)',
    lastLogin: 'Last Login',
    lastUpdated: 'Last Updated'
  },
  home: {
    welcome: 'Welcome',
    description: 'Discover the central hub of our platform. From here, you can access various sections such as your profile and settings to enhance your experience.'
  },
  profile: {
    title: 'Profile',
    actions: {
      editProfile: 'Edit Profile',
      logout: 'Logout',
      uploadPhoto: 'Upload Photo',
      changePassword: 'Change Password'
    },
    info: {
      joined: 'Joined',
      location: 'Location',
      email: 'Email',
      bio: 'Bio'
    },
    sections: {
      interests: {
        title: 'Interests',
        empty: 'No interests added yet'
      },
      skills: {
        title: 'Skills',
        empty: 'No skills added yet'
      }
    }
  },
  interests: {
    options: {
      technology: 'Technology',
      music: 'Music',
      sports: 'Sports',
      travel: 'Travel',
      reading: 'Reading',
      art: 'Art',
      cooking: 'Cooking',
      gaming: 'Gaming',
      photography: 'Photography',
      writing: 'Writing'
    }
  },
  skills: {
    options: {
      javascript: 'JavaScript',
      react: 'React',
      python: 'Python',
      css: 'CSS',
      html: 'HTML',
      nodejs: 'Node.js',
      typescript: 'TypeScript',
      sql: 'SQL',
      java: 'Java',
      csharp: 'C#'
    }
  },
  settings: {
    title: 'Settings',
    preferences: {
      title: 'Preferences',
      theme: 'Theme',
      themes: {
        light: 'Light',
        dark: 'Dark'
      },
      language: 'Language',
      languages: {
        english: 'English',
        french: 'French'
      },
      fontSize: 'Font Size',
      fontSizes: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large'
      }
    },
    privacy: {
      title: 'Privacy',
      profileVisibility: 'Profile Visibility',
      onlineStatus: 'Online Status'
    },
    buttons: {
      save: 'Save Changes',
      changePassword: 'Change Password'
    },
    alerts: {
      success: 'Settings saved successfully',
      error: 'Error saving settings'
    }
  },
  profileCustomization: {
    title: 'Profile Customization',
    form: {
      username: 'Username',
      bio: 'Tell us about yourself',
      email: 'Email',
      location: 'Location',
      interests: 'Interests',
      skills: 'Skills',
      addInterests: 'Add Interests',
      addSkills: 'Add Skills',
      saveProfile: 'Save Profile'
    },
    modals: {
      selectInterests: 'Select Interests',
      selectSkills: 'Select Skills'
    }
  },
  setPassword: {
    title: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    submit: 'Change Password',
    cancel: 'Cancel',
    updating: 'Updating...',
    success: 'Password updated successfully!',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    strength: {
      label: 'Password Strength',
      strong: 'Strong',
      moderate: 'Moderate',
      weak: 'Weak'
    },
    requirements: {
      title: 'Password Requirements',
      length: 'At least 8 characters',
      uppercase: 'At least one uppercase letter',
      lowercase: 'At least one lowercase letter',
      number: 'At least one number',
      special: 'At least one special character (!@#$%^&*)',
      match: 'Passwords match'
    },
    errorMessages: {
      incorrect: 'Current password is incorrect',
      requirements: 'Please meet all password requirements',
      loginAgain: 'Please log in again',
      error: 'An error occurred while updating the password'
    },
    locked: 'Too many attempts. Please try again in {{seconds}} seconds'
  },
};

const fr = {
  navigation: {
    home: 'Accueil',
    profile: 'Profil',
    settings: 'Paramètres',
    logout: 'Déconnexion'
  },
  dateTime: {
    currentUser: 'Utilisateur actuel',
    currentTime: 'Date et heure actuelles (UTC)',
    lastLogin: 'Dernière connexion',
    lastUpdated: 'Dernière mise à jour'
  },
  home: {
    welcome: 'Bienvenue',
    description: 'Découvrez le hub central de notre plateforme. D\'ici, vous pouvez accéder à différentes sections telles que votre profil et vos paramètres pour améliorer votre expérience.'
  },
  profile: {
    title: 'Profil',
    actions: {
      editProfile: 'Modifier le profil',
      logout: 'Déconnexion',
      uploadPhoto: 'Télécharger une photo',
      changePassword: 'Changer le mot de passe'
    },
    info: {
      joined: 'Inscrit(e) en',
      location: 'Localisation',
      email: 'Courriel',
      bio: 'Biographie'
    },
    sections: {
      interests: {
        title: 'Centres d\'intérêt',
        empty: 'Aucun centre d\'intérêt ajouté'
      },
      skills: {
        title: 'Compétences',
        empty: 'Aucune compétence ajoutée'
      }
    }
  },
  interests: {
    options: {
      technology: 'Technologie',
      music: 'Musique',
      sports: 'Sports',
      travel: 'Voyage',
      reading: 'Lecture',
      art: 'Art',
      cooking: 'Cuisine',
      gaming: 'Jeux vidéo',
      photography: 'Photographie',
      writing: 'Écriture'
    }
  },
  skills: {
    options: {
      javascript: 'JavaScript',
      react: 'React',
      python: 'Python',
      css: 'CSS',
      html: 'HTML',
      nodejs: 'Node.js',
      typescript: 'TypeScript',
      sql: 'SQL',
      java: 'Java',
      csharp: 'C#'
    }
  },
  settings: {
    title: 'Paramètres',
    preferences: {
      title: 'Préférences',
      theme: 'Thème',
      themes: {
        light: 'Clair',
        dark: 'Sombre'
      },
      language: 'Langue',
      languages: {
        english: 'Anglais',
        french: 'Français'
      },
      fontSize: 'Taille de police',
      fontSizes: {
        small: 'Petite',
        medium: 'Moyenne',
        large: 'Grande'
      }
    },
    privacy: {
      title: 'Confidentialité',
      profileVisibility: 'Visibilité du profil',
      onlineStatus: 'Statut en ligne'
    },
    buttons: {
      save: 'Enregistrer les modifications',
      changePassword: 'Changer le mot de passe'
    },
    alerts: {
      success: 'Paramètres enregistrés avec succès',
      error: 'Erreur lors de l\'enregistrement des paramètres'
    }
  },
  profileCustomization: {
    title: 'Personnalisation du profil',
    form: {
      username: 'Nom d\'utilisateur',
      bio: 'Parlez-nous de vous',
      email: 'Courriel',
      location: 'Localisation',
      interests: 'Centres d\'intérêt',
      skills: 'Compétences',
      addInterests: 'Ajouter des centres d\'intérêt',
      addSkills: 'Ajouter des compétences',
      saveProfile: 'Enregistrer le profil'
    },
    modals: {
      selectInterests: 'Sélectionner des centres d\'intérêt',
      selectSkills: 'Sélectionner des compétences'
    }
  },
  setPassword: {
    title: 'Changer le mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmPassword: 'Confirmer le nouveau mot de passe',
    submit: 'Changer le mot de passe',
    cancel: 'Annuler',
    updating: 'Mise à jour...',
    success: 'Mot de passe mis à jour avec succès !',
    showPassword: 'Afficher le mot de passe',
    hidePassword: 'Masquer le mot de passe',
    strength: {
      label: 'Force du mot de passe', 
      strong: 'Fort',
      moderate: 'Moyen',
      weak: 'Faible'
    },
    requirements: {
      title: 'Exigences du mot de passe',
      length: 'Au moins 8 caractères',
      uppercase: 'Au moins une lettre majuscule',
      lowercase: 'Au moins une lettre minuscule',
      number: 'Au moins un chiffre',
      special: 'Au moins un caractère spécial (!@#$%^&*)',
      match: 'Les mots de passe correspondent'
    },
    errorMessages: {
      incorrect: 'Le mot de passe actuel est incorrect',
      requirements: 'Veuillez respecter toutes les exigences du mot de passe',
      loginAgain: 'Veuillez vous reconnecter',
      error: 'Une erreur est survenue lors de la mise à jour du mot de passe'
    },
    locked: 'Trop de tentatives. Veuillez réessayer dans {{seconds}} secondes'
  },
};

const translations = { en, fr };

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('languagePreference');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('languagePreference', language);
  }, [language]);

  const translate = (key) => {
    const keys = key.split('.');
    return keys.reduce((obj, k) => obj?.[k], translations[language]) || key;
  };

  const value = {
    language,
    setLanguage,
    t: translate
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = useLanguage;