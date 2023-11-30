export const G2Translations = {
  fr: {
    g2: {
      fieldRequired: 'Ce champ est obligatoire',
      fileRequired: 'Vous devez insérer ce fichier: {{fileDesc}}',
      needFieldAbove0: 'La valeur doit être supérieure à 0',
      needFieldPositive: 'La valeur doit être supérieure ou égale à 0',
      phoneNeedsToHave10Digits:
        'Le numéro de téléphone doit contenir dix chiffres',
      incorrectEmail: "L'email renseigné n'est pas correct",
      requiredStreet:
        "Vous devez renseigner l'addresse en plus de la ville et du code postal",
      requiredPostalCode:
        'Vous devez renseigner le code postal pour avoir une adresse complète',
      requiredCity:
        'Vous devez renseigner la ville pour avoir une adresse complète',
      emailAlreadyUsed: 'Cet email est déjà utilisé',
      completeTheEmail: 'Vous devez renseigner le mail',
      enterAValidEmail: "L'email renseigné n'est pas correct",
      siretNotFound:
        'Aucune information trouvé. Saisissez les informations ci-dessous manuellement',
      siretDescription:
        'Le numéro de siret permettra de remplir automatiquement une partie des champs suivants',
      addPicture: 'Ajouter une image',
      removePicture: "Retirer l'image",
      'file-invalid-type': 'Les fichiers doivent être au format: {{formats}}',
      'file-too-large': 'Les fichiers ne devrait pas dépasser {{sizeLimit}}Mo',
      'too-many-files': "Vous ne pouvez ajouter qu'un seul fichier à la fois",
      or: 'ou',
      Required: 'Obligatoire',
      openFullScreen: 'Ouvrir en pleine écran',
      canDrag: 'Vous pouvez déplacer ce point',
      addMarker: 'Ajouter un marker',
      useMyPosition: 'Utiliser ma position',
      logo: "Logo de l'entreprise",
      siret: 'Numéro de siret',
      name: 'Nom',
      roles: 'Rôle',
      facultativeField: '{{label}} (facultatif)',
      website: 'Site web',
      description: 'Description',
      organization: 'Organisation',
      address: 'Adresse',
      postalCode: 'Code postal',
      city: 'Ville',
      givenName: 'Prénom',
      familyName: 'Nom de famille',
      memberOf: '$t(g2.organization)',
      email: 'Adresse mail',
      phone: 'Numéro de téléphone',
      sendVerifyEmail: "Envoyer le mail de vérification de l'adresse email",
      sendResetPassword:
        "Envoyer le mail de création de son mot de passe à l'utilisateur",
      user: 'Utilisateur',
      completeThePassword: 'Vous devez renseigner le mot de passe',
      passWordLongerThan8:
        "Le mot de passe doit être composé d'au minimum 8 caractères",
      samePasswordCheck:
        'Vous devez renseigner un mot de passe identique au premier',
      newPassword: 'Nouveau mot de passe',
      passwordCheck: 'Vérification du mot de passe',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      password: 'Mot de passe',
      changePassword: 'Changer le mot de passe',
      passwordChangement: 'Changement de mot de passe',
      passwordEmail:
        "Un email pour effectuer le changement de mot de passe va être envoyé à l'adresse email de votre compte.",
      clear: 'Vider',
      accept: 'Valider',
      today: "Aujourd'hui",
      addImages: 'Ajouter une ou plusieurs images',
      gallery: 'Galerie',
      save: 'Enregistrer',
      copySuccess: 'Déjà copié, cliquez ici pour re-copier',
      copyToClipboard: 'Copier dans le presse papier',
      required: 'Obligatoire',
      noData: 'Aucune donnée trouvé',
      noOrganization: "Vous n'êtes pas inclut dans une organisation"
    },
    http: {
      '600': "{{errorMessage}} à cause d'un problème de connexion",
      '401':
        "Vous essayez d'accéder à une ressource à laquelle vous n'êtes pas autorisé",
      '500':
        "{{errorMessage}} à cause d'un problème technique, si ce problème persiste contactez un administrateur",
      errors: {
        organizationPage:
          "La liste des organisations n'a pas pu être récupérée",
        organizationGet: "Le détail de l'organisation n'a pas pu être répuré",
        organizationUpdate: "L'organisation n'a pas pu être mise à jour",
        organizationCreate: "L'organisation n'a pas pu être créée",
        organizationUploadLogo: "Le logo de l'organisation n'a pu être envoyé",
        organizationDisable: "L'organisation n'a pas pu être supprimée",
        userPage: "La liste des utilisateurs n'a pas pu être récupérée",
        userGet: "le détail de l'utlisateur n'a pas pu être répuré",
        userUpdate: "L'utilisateur n'a pas pu être mis à jour",
        userCreate: "L'utilisateur n'a pas pu être créé",
        userUpdatePassword:
          "Le mot de passe de l'utlisateur n'a pas pu être mis à jour",
        userResetPassword:
          "La demande de renouvellement de mot de passe de l'utlisateur n'a pas pu être envoyée",
        userUpdateEmail: "L'email de l'utilisateur n'a pas pu être mis à jour",
        userDisable: "L'utilisateur n'a pas pu être supprimé"
      },
      success: {
        organizationUpdate: "L'organisation a bien été mise à jour",
        organizationCreate: "L'organisation a bien été créée",
        organizationDisable: "L'organisation a bien été supprimée",
        userUpdate: "L'utilisateur a bien été mis à jour",
        userCreate: "L'utilisateur a bien été créé",
        userUpdatePassword:
          "Le mot de passe de l'utlisateur a bien été mis à jour",
        userResetPassword:
          "La demande de renouvellement de mot de passe de l'utlisateur a bien été envoyée",
        userDisable: "L'utilisateur a bien été supprimé"
      }
    }
  },
  en: {
    g2: {
      fieldRequired: 'This field is required',
      fileRequired: 'You must insert this file: {{fileDesc}}',
      needFieldAbove0: 'The value must be greater than 0',
      needFieldPositive: 'The value must be greater than or equal to 0',
      phoneNeedsToHave10Digits: 'The phone number must have ten digits',
      incorrectEmail: 'The entered email is incorrect',
      requiredStreet:
        'You must provide the address in addition to the city and postal code',
      requiredPostalCode:
        'You must provide the postal code for a complete address',
      requiredCity: 'You must provide the city for a complete address',
      emailAlreadyUsed: 'This email is already in use',
      completeTheEmail: 'You must complete the email',
      enterAValidEmail: 'The entered email is incorrect',
      siretNotFound:
        'No information found. Please manually enter the following information',
      siretDescription:
        'The SIRET number will automatically populate some of the following fields',
      addPicture: 'Add a picture',
      removePicture: 'Remove the picture',
      'file-invalid-type':
        'Your file must be in the following format: {{formats}}',
      'file-too-large': 'Your file should not exceed {{sizeLimit}}MB',
      'too-many-files': 'You can only add one file at a time',
      or: 'or',
      Required: 'Required',
      openFullScreen: 'Open in fullscreen',
      canDrag: 'You can move this point',
      addMarker: 'Add a marker',
      useMyPosition: 'Use my position',
      logo: 'Company Logo',
      siret: 'SIRET Number',
      name: 'Name',
      roles: 'Roles',
      facultativeField: '{{label}} (optional)',
      website: 'Website',
      description: 'Description',
      organization: 'Organization',
      address: 'Address',
      postalCode: 'Postal code',
      city: 'City',
      givenName: 'Given Name',
      familyName: 'Family Name',
      memberOf: '$t(g2.organization)',
      email: 'Email Address',
      phone: 'Phone Number',
      sendVerifyEmail: 'Send email verification to the email address',
      sendResetPassword: 'Send password reset email to the user',
      user: 'User',
      completeThePassword: 'You must provide the password',
      passWordLongerThan8: 'The password must be at least 8 characters long',
      samePasswordCheck: 'You must enter a password identical to the first one',
      newPassword: 'New Password',
      passwordCheck: 'Password Confirmation',
      cancel: 'Cancel',
      confirm: 'Confirm',
      password: 'Password',
      changePassword: 'Change Password',
      passwordChangement: 'Password Change',
      passwordEmail:
        "An email to change the password will be sent to your account's email address.",
      clear: 'Clear',
      accept: 'Accept',
      today: 'Today',
      addImages: 'Add one or more images',
      gallery: 'Gallery',
      save: 'Save',
      copySuccess: 'Already copied, click here to re-copy',
      copyToClipboard: 'Copy to clipboard',
      required: 'Required',
      noData: 'No data found',
      noOrganization: 'You are not included in an organization'
    },
    http: {
      '600': '{{errorMessage}} due to a network issue',
      '401': 'You are trying to access a ressource you are not authorized to',
      '500':
        '{{errorMessage}} due to a technical issue, if this error occurs again please contact an administrator',
      backendErrors: {},
      errors: {
        organizationPage: 'The list of organizations could not be retrieved',
        organizationGet: 'The organization details could not be retrieved',
        organizationUpdate: 'The organization could not be updated',
        organizationCreate: 'The organization could not be created',
        organizationUploadLogo: "The organization's logo could not be uploaded",
        organizationDisable: 'The organization could not be deleted',
        userPage: 'The list of users could not be retrieved',
        userGet: 'User details could not be retrieved',
        userUpdate: 'The user could not be updated',
        userCreate: 'The user could not be created',
        userUpdatePassword: "The user's password could not be updated",
        userResetPassword:
          "The request to reset the user's password could not be sent",
        userUpdateEmail: "The user's email could not be updated",
        userDisable: 'The user could not be deleted'
      },
      success: {
        organizationUpdate: 'The organization has been updated successfully',
        organizationCreate: 'The organization has been created successfully',
        organizationDisable: 'The organization has been deleted successfully',
        userUpdate: 'The user has been updated successfully',
        userCreate: 'The user has been created successfully',
        userUpdatePassword: "The user's password has been updated successfully",
        userResetPassword:
          "The request to reset the user's password has been sent successfully",
        userDisable: 'The user has been deleted successfully'
      }
    }
  }
}
