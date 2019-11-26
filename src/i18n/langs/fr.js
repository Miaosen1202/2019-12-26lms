import frLocale from "element-ui/lib/locale/lang/fr";
// 引入element语言包
const fr = {
    message: {
        left: {
            Account: "Compte ",
            Dashboard: " Tableau de bord ",
            Course: " Cours ",
            Calendar: " Calendrier ",
            Resource: " Ressource ",
            Message: " Message ",
            Certification: "Certification",
            Group: "Groupe",
            People: " Personnes ",
            Sub_Account: " Sous-compte ",
            Terms: " Termes ",
            SIS_Import: " Importation SIS ",
            Settings: " Paramètres "
        },
        /* -------------- 通用提示 ---------------*/
        Common_please_select: " Veuillez Sélectionner",
        Common_search: " Rechercher ",
        Common_confirm: " Confirmer ",
        Common_cancel: " Annuler ",
        Common_close: " Fermer ",
        Common_create: " Créer ",
        Common_New: " Nouveau ",
        Common_edit: "Editer ",
        Common_delete: " Supprimer ",
        Common_success: " Succès ",
        Common_fail: "échouer ",
        Common_update: " Mettre à jour ",
        Common_example: "Exemple",
        Common_submit: " Soumettre ",
        Common_prev: " Précédent ",
        Common_next: "Suivant",
        Common_rule_cannot_be_empty: " Ne peut pas être vide ",
        Common_update_success: " Mise à jour avec succès ",
        Common_no_data_show_now_tip:
            "Aucune donnée ne s" + " ' " + "affichemaintenant",
        No: "Non",
        Sure: " Sûr ",
        teacher_assistant: "Teacher Assistant",
        /* -------------- 通用提示 END ---------------*/

        /* account 个人设置 */
        Mission: "Mission",
        profile: " Profil ",
        userName: "Nom de l" + " ' " + "affichage:",
        title: " Titre:",
        Contact: "Contact",
        Phone_Number: " Numéro de téléphone:",
        Email: "Email:",
        Biography: " Biographie ",
        link: " lien:",
        Add_a_link: " Ajouter un lien ",
        Full_Name: "Nom complet:",
        Display_Name: " Nom de l" + " ' " + "affichage:",
        language: " Langue:",
        Edit_Settings: " Editer les Paramètres",
        Change_Password: "Changer le mot de passe",
        Emails_for_Contacting: " Email pour contact",
        Add_Emails_Address: " Ajouter une adresse d’Email",
        for: "pour",
        /* ----------END----------------*/
        /* 资源 */
        Search: " Rechercher ",
        Shared: " Partagé",
        Imported: "Importé",
        Updates: " Mittre à jour ",
        SearchByTag: " Recherche par étiquette, nom, institution ou résultat ",
        Type: " Type ",
        "Grade/Level": " Grade/Niveau ",
        Latest: " Dernier ",

        /* -------------END---------------*/

        /* 资源详情 */
        ImportIntoCourse: " Importer au cours ",
        SHAREDBY: " PARTAGÉ PAR ",
        LeaveYourReview: "Laissez votre commentaire ",

        /* -------------END---------------*/
        /* 课程course */
        Settings: " Paramètres ",

        /* -------------END---------------*/

        /* ---------------课程home-----------*/
        Course_Status: "État du cours ",
        Unpublished: " Non publié",
        Choose_Home_Page: " Choisir la page d" + " ' " + "accueil ",
        module: " Module ",
        Requirements: " Exigences ",
        Select_want_you_like:
            " Sélectionner ce que vous souhaitez afficher sur la page d" +
            " ' " +
            "accueil ",
        Front_page_must_be_set_first:
            " La page d’accueil doit être parametrée en premier ",
        Choose_Course_Home_Page:
            " Choisir la page d" + " ' " + "accueil du cours ",
        Manage_Question_Banks: " Gérer les banques de Question ",
        recent_activity: " Activité récente ",

        /* ------------END---------------*/
        /* 课程模块——设置settings */
        De_Conclude: " Terminez ce cours ",
        Share_to_Commons: " Partager sur Ressources ",
        Student_View: " Vue de l " + "'" + "étudiant ",
        Course_Statistics: " Statistiques du cours ",
        Course_Calendar: " Calendrier du cours ",
        Conclude_this_Course: " Terminer ce cours ",
        unConclude_this_Course: " Annuler la termination de cours ",
        Delete_this_Course: " Supprimer ce cours ",
        Copy_this_Course: " Copier ce cours ",
        Import_Course_Content: "Importer le contenu du cours ",
        Export_Course_Content: " Exporter le contenu du cours ",
        Reset_Course_Content: " Réinitialiser le contenu du cours ",
        Validate_Links_in_Content: " Valider les liens dans le contenu ",
        Current_Users: " Utilisateurs actuels ",
        Students: " Etudiants ",
        Teachers: " Enseignants ",
        TAs: "AE",
        Designers: " Concepteurs ",
        Observers: " Observateurs ",
        Update_Course_Details: " Mettre à jour les détails du cours ",
        can_create:
            " peut créer, renommer et modifier les pages de cours par défaut ",
        Disable_comments: " Désactiver les commentaires sur les annonces ",
        Hide_grade_distribution_graphs_from_students:
            " Masquer les graphiques de distribution de note des étudiants ",
        Hide_totals_in_student_grades_summary:
            " Masquer les totaux dans le résumé de note des étudiants ",
        Let_students_organize_their_own_groups:
            " Laisser les étudiants organiser leurs propres groupes ",
        Let_students_edit_or_delete_their_own_discussion_posts:
            " Laisser les étudiants modifier ou supprimer leurs propres publications de discussion ",
        Let_students_create_discussion_topics:
            " Laisser les étudiants créer des sujets de discussion ",
        Let_students_attach_files_to_discussions:
            " Laisser les étudiants joindre des dossiers aux discussions ",
        Number_of_announcements_shown_on_the_homepage:
            " Nombre d" +
            "'" +
            "annonces affichées sur la page d" +
            "'" +
            "accueil ",
        Show_recent_announcements_on_Course_home_page:
            " Afficher les annonces récentes sur la page d" +
            " ' " +
            "accueil du cours ",
        "Let_students_self-enroll_by_sharing_with_them_a_secret_URL_or_code":
            " Laisser les étudiants s" +
            " ' " +
            "inscrire eux-mêmes en partageant avec eux une URL ou un code secret ",
        When_selected:
            " Lorsqu’il est sélectionné, le cours est inaccessible en dehors des dates de cours. Si les dates de cours sont en blanc,\n" +
            "                  ces dates de début et de fin s" +
            " ' " +
            "appliquent aux dates de trimestre",
        course_before_start_date:
            " Empêcher les étudiants de visionner ce cours avant la date de démarrage ",
        course_after_end_date:
            " Empêcher les étudiants de visionner ce cours après la date de fin ",
        Students_can_only_participate:
            " Les étudiants peuvent participer au cours uniquement entre ces dates \n" +
            " Lorsqu’il est sélectionné, le cours en lecture seuleen dehors de ces dates.",
        Changing_course_dates:
            " Changer les dates des cours peut remplacer les réglages de leur durée de disponibilité et leur placement dans les pages de cours ou le tableau de bord. .\n" +
            "                  Veuillez confirmer les dates des trimestres avant de modifier les dates des cours.",
        This_will_override:
            " Les paramètres linguistiques des utilisateurs/du système seront remplacés..\n" +
            "                  Cette option est recommandée uniquement pour les cours en langue étrangère ",
        /* 导航 */
        Course_Details: " Détails du cours ",
        Sections: "Sections",
        Navigation: "Navigation",
        Apps: "Apps",
        Feature_Options: " Options de fonctionnalités ",
        Drag_items_here_to_hide_them_from_students:
            " Faites glisser les élément ici pour les masquer des étudiants ",
        Disabling_most_pages:
            " La désactivation de la plupart des pages entraînera la redirection des étudiants qui consultent ces pages vers la page d" +
            " ' " +
            "accueil du cours.",
        Page_disabled: " Page désactivée, n'apparaîtra pas dans la navigation ",
        Drag_and_drop:
            " Faites glisser les éléments pour les classer dans la barre de navigation des cours..",

        /* Course Details */
        Course_is_Published: " Le cours est publié",
        Image: "Image :",
        Choose_Image: " Choisissez une image ",
        Name: " Nom ",
        Course_Code: " Rejoindre le code ",
        Blueprint_Course: " Cours de plan directeur :",
        Time_Zone: " fuseau horaire:",
        Subaccount: " Sous-compte:",
        Term: " Trimestre:",
        Terms: " Trimestre ",
        Starts: " Début à:",
        Ends: "Se termine à :",
        Language: " Langue :",
        File_Storage: " Stockage de fichier :",
        Grading_Scheme: " Système de notation :",
        License: "Droit d" + " ' " + "auteur du ficier :",
        Visibility: " Visibilité:",
        Format: "Format :",
        Description: "Description :",
        Default_Term: " Trimestre par défaut ",
        Enable: " Activer le système de notation de cours ",
        view: " Vue du Système de notation ",
        Customize: " Personnaliser ",
        Course_Syllabus: " Programme ",

        /* sections课程 */
        Course_Sections: " Sections du cours ",
        Section: "Section",
        Add_Section: " Ajouter une nouvelle section ",

        /* Navigation导航 */
        textHeard: " Texte de l’en-tête ",
        external: " URL externe ",
        Home: " Accueil ",
        Announcements: " Annonces ",
        Assignments: " tâchess ",
        Discussions: " Discussions ",
        Grades: " Notes ",
        People: " Personnes ",
        Pages: "Pages",
        Files: " Fichiers ",
        Syllabus: " Programme ",
        Outcomes: " Résultats ",
        Quizzes: " Quiz ",
        Modules: "Modules",
        Course_Navigation: " Navigation de cours ",
        Conferences: " Conférences ",
        Collaborations: " Collaborations ",
        Attendance: " Fréquentation ",
        Analytics_Beta: " Bêta analytique ",

        /* 应用程序Apps */
        External_Apps: " Applications externes ",
        All: "Tout",
        Not_Installed: " Non installé",
        Installed: " Installé",
        Filter_by_name: " Filtrer par nom ",

        /* -------------END---------------*/
        /* ----------------大纲------------------*/
        The_syllabus_page:
            " La page du programme montre une vue sous forme de tableau du programme de cours et les bases de la notation des cours. Vous pouvez ajouter tout autre commentaire, note ou opinion que vous avez sur la structure du cours, ses règles ou autre.",
        To_add_some_comments:
            ' Pour ajouter des commentaires, cliquez sur le lien "Modifier" en haut..',
        Update_Syllabus: " Mise à jour du syllabus ",
        Course_Summary: " Résumé du cours ",
        Date: "Date",
        due_by: " dû par ",
        Back_to_tody: " Retour à aujourd" + "'" + "hui ",
        Su: "Su",
        Mo: "Mo",
        Tu: "Tu",
        We: "We",
        Th: "Th",
        Fr: "Fr",
        Sa: "Sa",
        Assignments_are_weighted_by_group:
            " Les affectations sont pondérées par groupe ",
        Course_assignments: " Les travaux de cours ne sont pas pondérés.",
        Weight: " Poids ",
        New_Announcement: " Nouvelle annonce ",
        Select_what:
            " Sélectionnez ce que vous souhaitez afficher sur la page d'accueil.",
        ACTIVE_STREAM: " FLUX ACTIF ",
        MODULE: " MODULE ",
        ASSIGNMENTS: " AFFECTION ",
        SYLLABUS: " PROGRAMME ",
        View_Course_Calendar: " Voir le calendrier du cours ",
        Dialog: " Dialogue ",
        Reply_you: " Répondez vous ",
        re_Comment: " re-commenter ",
        Quize: "Quize",
        Created: "Établi ",
        Content_Changed: " Contenu modifié",
        HOME: {
            Temporarily_no_data: " Temporairement pas de données ......",
            more: "plus >>",
            From: "de",
            Message: "Message",
            Notification: "Notification",
            No_data_to_be_shown_now: " Aucune donnée à afficher maintenant ",
            Term: " Terme "
        },

        /* ---------------END-------------------*/

        /* 单元模块Modules */
        View_Progress: " Afficher la progression ",
        Add_Module: " Ajouter un module ",
        Module: "Module",
        collapse: " vers le haut/vers le bas ",
        Module_Name: " Nom du module ",
        Lock_until: " Verrouiller jusqu" + " ' " + "à/au/en",
        Add_Prerequisite: " Ajouter Prérequisite ",
        Select_Module: " Sélectionner Module ",
        Assignment_Name: " Nom du tâches ",
        Quiz_Name: " Nom du quiz ",
        pts: "pts",
        Multiple_Due_Dates: " Dates d" + " ' " + "échéance multiples ",
        Indentation: " Dentelure ",
        strategy: " Stratégie ",
        TOP: " En haut",
        BOTTOM: "En bas",
        AFTER: " Après ",
        BEFORE: " Avant ",
        Add_Assignment: " Ajouter un tâches ",
        Add_Item: " Ajouter un article ",
        Unlock_At: " Déverrouillage à ",
        Students_must_complete_all:
            " Les étudiants doivent remplir toutes ces exigences ",
        Students_must_move_through:
            " Les étudiants doivent passer par les exigences dans l" +
            " ' " +
            "ordre séquentiel ",
        Student_must_complete_one:
            " L" +
            " ' " +
            "étudiant doit remplir l" +
            " ' " +
            "une de ces exigences ",
        Not_Indentation: " Ne pas encher ",
        Indentation_1: "indent 1",
        Indentation_2: "indent 2",
        Indentation_3: "indent 3",
        Edit_Module: " Modifier le réglage du module ",
        Edit_Module_Item: " Modifier le réglage des éléments du module ",
        Source_Module: " Module Source ",
        Target_Module: " Module cible ",
        form_originId: " L" + " ' " + "élément de module est exigé",
        originId: " L" + " ' " + "article est requis ",
        Module_Item: "Élément du module ",
        Mudule_Name_Valid: " Le nom du module est requis ",
        Name_Title: " Le titre est requis ",
        Name_Validl: " Le nom est requis ",
        target_moduleId_isValid: " La module cible est nécessaire ",
        strategy_isValid: " La stratégie est nécessaire ",
        Creat_a_new_Module: " Créer un nouveau module ",
        Sub_header: " Sous-en-tête ",
        Assignment_group: " Groupe d" + "'" + "affectation ",
        Assignment: " Affectation ",
        Quiz_type: " Type de quiz ",
        Select_quiz: " Sélectionnez le quiz ",
        Create_new: " Créer un nouveau ",
        Discussion_type: " Type de discussion ",
        Select: " Sélectionner ",
        ungraded: " non classé",
        Practic_Quiz: " Quiz de pratique ",
        Uploud_a_file: " Télécharger un fichier ",
        Edit_Item: " Modifier l" + "'" + "article ",
        url: "url",
        Practice_Quizzes: " Pratique Quiz ",
        Url_is_required: " L" + "'" + "URL est obligatoire ",
        delete_statement:
            "Êtes-vous sûr de bien vouloir supprimer cet élément?",
        Delete_succeeded: " Supprimer réussi!",
        Upgrade_Module: " Module de mise à niveau ",
        Type_the_text:
            " Tapez le texte que vous souhaitez ajouter comme sous-en-tête de module.",
        Select_the_assignment:
            " Sélectionnez l" +
            "'" +
            "affectation que vous souhaitez associer à ce module ou ajoutez une affectation en créant une nouvelle!",
        Select_the_Discussion:
            " Sélectionnez la discussion que vous souhaitez associer à ce module ou ajoutez-en une nouvelle en créant une nouvelle.",
        Select_the_quiz:
            " Sélectionnez le quiz que vous souhaitez associer à ce module ou ajoutez-en un nouveau en créant un nouveau!",
        Select_the_file:
            " Sélectionnez le fichier que vous souhaitez associer à ce module ou ajoutez un fichier en le téléchargeant.",
        Enter_a_URL:
            " Entrez une URL et un nom de page pour ajouter un lien vers une URL de site Web vers ce module.",
        No_modules_have:
            " Aucun module n" + "'" + "a été défini pour ce cours.",

        /* -------------END---------------*/
        /* ----------课程测验Quizzes--------------*/
        Unnamed_quiz: " Quiz sans nom ",
        Search_for_Quiz: " Recherche de Quiz ",
        Details: " Détails ",
        Unnamed_Quiz: " Quiz sans nom ",
        Quiz_Type: " Type de quiz ",
        Assignment_Group: " Groupe de tâches ",
        gradeType: " Afficher la note en tant que ",
        points: " Points ",
        percentage: " Pourcentage ",
        gpa: " Échelle du GPA ",
        letter: " Lettre de notation ",
        notGrade: " Non noté",
        score: "note",
        Student_will_automatically:
            " Les étudiants recevront automatiquement le plein crédit une fois qu" +
            " ' " +
            "il aura reçu le sondage ",
        Options: " Options ",
        Shuffle_Answers: " Melanger les réponses ",
        Time_Limit: "Limite de temps",
        Minutes: " Minutes ",
        Keep_Submissions_Anonymous: " Garder les soumissions anonymes ",
        Allow_Multiple_Attempts: " Autoriser plusieurs tentatives ",
        Quiz_Score_to_keep: " Score de quiz à conserver  ",
        Allowed_Attempts: " Tentatives autorisées ",
        Let_Students_See_Their_Quiz:
            " Autoriser les étudiants à voir leurs réponses au quiz (les questions incorrectes seront marquées dans les commentaires des étudiants)",
        Only_After_Their_Last_Attempt:
            " Uniquement après leur dernière tentative ",
        Let_Students_See_The_Correct_Answers:
            " Laisser les étudiants voir les réponses correctes ",
        show_Correct_Answers_at: " Montrer Les réponses correctes le",
        Hide_Correct_Answers_at: " Masquer les réponses correctes le",
        Show_one_question_at_a_time: " Afficher une question à la fois ",
        Lock_questions_after_answering:
            " Verrouiller les questions après y avoir répondu ",
        Require_an_access_code: " Nécessite un code d" + " ' " + "accès ",
        Filter_IP_Addresses: " Filtrez les adresses IP ",
        Quiz_Restrictions: " Restrictions du quiz ",
        Assign: " Attribuer ",
        Assign_to: " Attribuez à/au",
        Due: " dû ",
        // Available_from: ' Disponible depuis le ',
        // 'Available_from':' Disponible depuis le ',
        Until: " Jusqu" + " ' " + "à",
        Add: " Ajouter ",
        Add_Module_Item: " Ajouter un élément au module ",
        Notify_users_that_this_content_has_changed:
            " Informer les utilisateurs que ce contenu a changé",
        Links: "Liens",
        link_to_other_content_in_the_course:
            " Lier à un autre contenu du cours. Cliquez sur une page pour insérer un lien dans cette page.",
        Upload_a_new_file: " Télécharger un nouveau fichier ",
        Cancel_file_upload: " Annuler le téléchargement du fichier ",
        // 'Folder':' Dossier ',
        Upload: " Télécharger ",
        Search_Flickr: " Recherche Flickr ",
        Upload_a_new_image: " Télécharger une nouvelle image ",
        Cancel_image_upload:
            " Annuler le téléchargement de l" + " ' " + "image ",
        Select_files: " Sélectionner les fichiers ",
        Images: " Images ",
        Enter_search_terms: " Entrer les termes de recherche ",
        Preview: " Aperçu ",
        Published: " Publié ",
        UnPublished: " Non Publié",
        One_Question_at_a_Time: " Une question à la fois ",
        Show_Correct_Answers: " Afficher les réponses correctes ",
        View_Responses: " Afficher les réponses ",
        Multiple_Attempts: " Tentatives multiples ",
        Points: " Points ",
        Related_items: " Articles connexes ",
        Moderate_This_Quiz: " Modérer ce quiz ",
        Download_All_Files: " Télécharger tous les fichiers ",
        this_is_a_preview_of: " Ceci est un aperçu du brouillon du quiz.",
        Started: " Début",
        For: " à ",
        Available_from: " Disponible à partir de ",
        Submit_Quiz: " Soumettre le quiz ",
        Keep_Editing_This_Quiz: " Continuer à modifier ce quiz ",
        Question: "Question",
        Time_Elapsed: " Temps écoulé",
        Hide: "Cacher ",
        Questions: "Questions",
        Notify_users_that: " Informer les utilisateurs que ce contenu a changé",
        New_Question: " Nouvelle Question ",
        New_Question_Group: " Nouveau groupe de questions ",
        Score_for_this_quiz: " Note pour ce quiz ",
        time: " Temps ",
        Current_Score: " Note actuelle ",
        Kept_Score: " Note conservée ",
        Preview_the_Quiz_Again: " Aperçu du quiz de nouveau ",
        submitted_Dec: " Soumis déc ",
        Assignment_Quizzes: " Quiz de devoir ",
        Quiz: "Quiz",
        No_practice_quizzes: " Aucun quiz de pratique dans ce groupe ",
        Share_to_Resource: " Partager à la ressource ",
        Pt: "Pt",
        Pts: "Pts",
        No_assignment_quizzes:
            " Aucun questionnaire de mission dans ce groupe ",
        Graded_Quiz: " Quiz noté",
        delete_quiz:
            "Êtes-vous sûr de vouloir supprimer ce questionnaire / cette enquête?",
        Please_enter: " Entrez s" + "'" + "il vous plait ",
        Please_select: " Veuillez choisir ",
        code: "code",
        Highest: " le plus haut ",
        Average: "Moyen",
        Point_is_required: " Le point est requis ",
        Everyone_Else: " Tous les autres ",
        Question_Name: " Nom de la question ",
        Question_Type: " Type de question ",
        Message_Text: " Texte du message ",
        Add_Another_Answer: " Ajouter une autre réponse ",
        Answer_Explain: " Répondre expliquer ",
        Update_Question: " Mettre à jour la question ",
        Explain: " Expliquer ",
        Explanation: " Explication ",
        general_Comment: " commentaire général ",
        Mulitple_Answers: " Réponses multiples ",
        True_False: " Vrai / Faux ",
        Essay_Question: " Question d" + "'" + "essai ",
        Points_possible_is_required: " Points possibles est requis ",
        At_least_one_correct_option: " Au moins une option correcte ",
        Show: "Démonstration",
        The_time_is_not_limited: " Le temps n" + "'" + "est pas limité!",
        After_each_submission: " Après chaque soumission ",
        Last_submission: " Dernière soumission ",
        Show_all: " Montre tout ",
        One_per_page: " Un par page ",
        GradeNow: " Noter maintenant ",
        Submission_Details: " Détails de la soumission ",
        Some_subjective_questions:
            "* Quelques questions subjectives non encore notées ",
        will_keep_the_highest: " gardera le plus élevé de vos scores.",
        will_keep_the_latest: " gardera le plus élevé de vos scores.",
        will_keep_the_average: " gardera la moyenne de vos scores.",
        Practice_Quiz: " Quiz de pratique ",

        /* 后加 */
        Multiple_Choice: " Choix multiple ",

        /* ------------------studentQuizz------------------*/
        Last_Attempt: " Dernière tentative ",
        Attempts_Available: " Essais disponibles ",
        Answers_will_be_shown:
            " Les réponses seront affichées après votre dernière tentative ",
        Allowed_to_look_right:
            " Permis de regarder correctement et faux, mais l" +
            "'" +
            "heure actuelle dépasse le temps nécessaire pour regarder la réponse ",
        Quiz_results_are_protected:
            " Les résultats du questionnaire sont protégés pour ce questionnaire et ne sont pas visibles pour les étudiants tant qu" +
            "'" +
            "ils n" +
            "'" +
            "ont pas soumis leur dernière tentative. ",
        Correct_answers_are_hidden: " Les bonnes réponses sont cachées!",
        Quiz_results_are:
            " Les résultats du questionnaire sont protégés pour ce questionnaire et ne sont pas visibles pour les étudiants. ",
        Please_enter_an_access_code:
            " Veuillez entrer un code d" + "'" + "accès ",
        Time_minute: " Temps (minute)",
        This_quiz_was_locked: " Ce quiz a été verrouillé",
        This_quiz_is_locked_until:
            " Ce quiz est verrouillé jusqu" + "'" + "au ",
        Resume_Quiz: " Reprendre le quiz ",
        Take_the_Quiz: "Participer à un test",

        To_allow: " Permettre de voir le bien ou le mal et de voir la réponse.",
        Allowed_to: " Permis de voir le bien et le mal.",
        Indicates_that:
            " Indiquer qu" +
            " ' " +
            "il n" +
            " ' " +
            "est pas permis de voir une erreur positive et de voir la réponse.",
        /* ---------------警告框-----------------------*/
        Allow_questions_to_be_answered: " Permettre de répondre aux questions.",
        Indicates_that_it_is_locked: " Indiquer chapeau il est verrouillé.",
        Indicates_an_access_code_error:
            " Indiquer une erreur de code d" + " ' " + "accès.",
        Indicates_that_the_number:
            " Indiquer que le nombre de réponses a atteint une limite.",
        IP_address_is_not_in_the_set_range:
            " L" +
            " ' " +
            "adresse IP n" +
            " ' " +
            "est pas dans la plage de l" +
            " ' " +
            "ensemble.",
        Reference_module_in_unlocked_state:
            " Module de référence en état déverrouillé.",
        The_current_time_is_not_within:
            " Le délai actuel n" +
            " ' " +
            "est pas dans le délai imparti pour répondre à la question.",

        /* --------------------------discussions讨论---*/
        discussion: "Discussion",
        There_are_no_discussions_to_show_in_this_section:
            " Il n" +
            " ' " +
            "y a pas de discussions à montrer dans cette section ",
        Click_here_to_add_a_discussion:
            " Cliquez ici pour ajouter une discussion ",
        upload: " Télécharger ",
        Al: " Tout ",
        Unread: " non lu ",
        Edit_Discussion_Settings: " Modifier les paramètres de discussion ",
        My_Settings: " Mes Paramètres ",
        Manually_mark_posts_as_read:
            " Marquer manuellement les publications comme étant lues ",
        Create_discussion_topic: " Créer un sujet de discussion ",
        Student_Settings: " Paramètres des étudiants ",
        Edit_and_delete_their_own_posts:
            " Modifier et supprimer leurs propres contributions ",
        Attach_files_to_discussions: " Joindre des fichiers aux discussions ",
        Save_Settings: " Enregistrer les paramètres ",
        Open_for_comments: " Ouvrir pour les commentaires ",
        Close_for_comments: " Fermer les commentaires ",
        Unpin: "Épingler",
        Duplicates: "Dupliquer",
        Share: " Partager ",
        Deletes: " Supprimer ",
        deletes:
            " Etes-vous sûr que vous voulez supprimer ce cours? Une fois qu" +
            " ' " +
            "il est supprimé, les étudiants et les enseignants n" +
            " ' " +
            "y auront plus accès. Si vous voulez juste le supprimer du menu déroulant de cours, vous devriez terminer le cours à la place. Si vous n" +
            " ' " +
            "avez pas la permission de terminer le cours, vous pouvez modifier la date de fin du cours ou demander à votre administrateur de terminer le cours.",
        Topic_Title: " Titre du sujet ",
        Post_to: " Publier à",
        Attachment: " Pièce jointe ",
        Optionss: "Options",
        Graded: " Noté ",
        Group_Discussion: " Discussion de groupe ",
        This_is_a_group_discussion: " Ceci est une discussion de groupe ",
        Group_Sets: " Ensemble de groupe ",
        New_Group_Category: " Nouvelle catégorie de groupe ",
        Points_Possible: " Points possibles ",
        Display_Grade_as: " Afficher la note en tant que",
        scores: "Note",
        The_percentage: " Le pourcentage ",
        Not_score: " Pas de note ",
        "Save&Publish": " Enregistrer & Publier ",
        Create_Group_Set: " Créer un ensemble de groupes ",
        Group_Set_Name: " Nom de l" + " ' " + "ensemble du groupe ",
        "Self_Sign-up": " Inscription libre ",
        Allow_Self_Sign_up: " Autoriser l" + " ' " + "inscription libre ",
        Require_group_members_to_be_in_the_same_section:
            " Exiger que les membres du groupe soient dans la même section ",
        Split_students_into: " Séparer les étudiants en ",
        groups: " groupes ",
        Ill_create_groups_manually: " Je vais créer des groupes manuellement ",
        create: " Créer ",
        groups_now: " groupes maintenant ",
        Limit_groups_to: " Limiter les groupes à",
        members_leave_blank_for_no_limit:
            " membres ((Laisser vide pour utiliser la valeur maximale)",
        Automatically_assign_a_student_group_leader:
            " Affecter automatiquement un chef de groupe d’étudiant ",
        Set_first_student_to_join_as_group_leader:
            " Définir le premier étudiant à se joindre en tant que chef de groupe ",
        Set_a_random_student_as_group_leader:
            " Définir un étudiant au hasard en tant que chef de groupe ",
        Edit_Save: " Editer & Enregistrer ",
        user: " utilisateur ",
        Students_have_already_submitted:
            " Les étudiants ont déjà soumis à cette discussion \n" +
            "                            , donc les paramètres de groupe ne peuvent pas être modifiés ",
        Create_assignment_group: " Créer un groupe d" + "'" + "affectation ",
        Select_a_date: " Sélectionnez une date ",
        Add_assignment_group: " Ajouter un groupe d" + "'" + "affectation ",
        Names: "Nom:",
        Please_select_the_assignment_group:
            " Veuillez sélectionner le groupe de mission ",
        The_value_of_possible_points_for:
            " La valeur des points possibles pour " +
            " cette discussion doit être comprise entre 0 et 1000",
        Points_possible_must_be_a_number:
            " Les points possibles doivent être un nombre ",
        Points_possible_is_require: " Points possibles est requis ",
        Please_select_a_study_group:
            " Veuillez sélectionner un groupe d" + "'" + "étude ",
        Please_enter_the_title: " S" + "'" + "il vous plaît entrer le titre ",
        The_length_is_between:
            " La longueur est comprise entre 1 et 200 caractères ",
        A_section_is_required: " Une section est requise ",
        Please_enter_the_homework_team:
            " S" +
            "'" +
            "il vous plaît entrer dans l" +
            "'" +
            "équipe de devoirs ",
        users: " utilisateurs ",
        close_for_comments: " fermé pour commentaires ",
        This_is_a_graded_discussion: " Ceci est une discussion graduée ",
        Your_search_did_not_match_any_entries:
            " Votre recherche ne correspond à aucune entrée ",
        Since_this_is_a_group:
            " Comme il s’agit d’une discussion de groupe, chaque groupe a sa propre conversation sur ce sujet. Voici ceux auxquels vous avez accès. ",
        You_are_about_to_delete_this_discussion:
            " Vous êtes sur le point de supprimer cette discussion. Êtes-vous sûr?",
        Content_cannot_be_empty: " Le contenu ne peut pas être vide ",
        Delete_successfully: " Supprimer avec succès ",
        Pin: "Pin",

        /* -------------END---------------*/

        /* ---------------student------------------*/

        /* ---------------quizzes测验--------------*/
        Last_Attempt_Details: " Détails de la dernière tentative ",
        minutes: " minutes ",
        Attempt_History: " Histoire de la tentative ",
        Take_the_Quiz_Again: " Reprendre le quiz ",
        Will_keep_the_highest_of_all_your_scores:
            " Gardera la note la plus élevée ",
        This_attempt_took: " Cette tentative a pris ",
        Preview_the_Quiz_Agains: " Aperçu du Quiz à nouveau ",
        Take_the_Quiz_Agains: " Reprendre le quiz ",
        Attempt_due: " Tentative due ",
        Seconds: " Secondes ",
        Quizzes_Instructions: " Instructions Quizzes ",
        Previous: " Précédent ",
        Next: "Suivant",
        Attempt: " Tentative ",
        Time: " Temps ",
        Score: "Note",

        /* --------------start: course课程-----------------*/
        All_Course: " Tous les cours ",
        More_Course: " Plus de cours ",
        Create_a_Course: " Créer un cours ",
        Course: " cours ",
        Nick_Name: " Nom court ",
        Publish: " Publier ",
        Create_New_Course: " Créer un nouveau cours ",
        Course_Name: " Nom du cours ",
        Date_starts: " Date de début ",
        Date_Ends: " Date de fin ",
        All_Users_associate_course:
            " Tous les utilisateurs sont associés à ce cours ",
        Institution: "Institution",
        All_Users_associate_institution:
            " Tous les utilisateurs sont associés à cette institution ",
        Public: "Public",
        Public_Text: " Toute personne ayant l" + " ' " + "URL du Cours ",
        Creat_Course: " Créer un cours ",
        Course_Empty_Tip: " Le nom du cours ne peut pas être vide ",
        Course_Beyond_Tip: " La longueur ne peut pas dépasser 200 caractères ",
        Nick_Name_Empty_Tip: " Le surnom ne peut pas être vide ",
        Nick_Beyond_Tip: " La longueur ne peut pas dépasser 100 caractères",
        Select_Start_Date: " Sélectionner la date de début ",
        Select_End_Date: " Sélectionner la date de fin ",
        Search_Course_Name: " Entrer le nom du cours SVP ",
        Public_Course: " Cours publics ",
        Enrollment_Courses: " Cours d" + " ' " + "inscription ouverts ",
        Join_Course: " Se joindre à ce cours ",
        enroll_as_student:
            " Etes-vous sûr de vous inscrire au Nom du Cours en tant qu" +
            " ' " +
            "étudiant ?",
        Confirm_Enroll: " confirmer pour enclenser dans ",
        Success_Join:
            " Vous avez réussi à participer au cours avec le nom de cours en tant qu" +
            " ' " +
            "étudiant ",
        To_Course: " Aller au cours ",
        Course_remove_favorite_tip:
            " Cliquer pour le supprimer de l" +
            " ' " +
            "entrée rapide et du tableau de bord ",
        Course_add_favorite_tip:
            " Cliquer pour l" +
            " ' " +
            "ajouter à l" +
            " ' " +
            "entrée rapide et le tableau de bord ",
        Course_publish_status_toggle_tip:
            " changer d" + " ' " + "état de cours entre Publié et Non Publié",
        Course_forbid_unpublish_by_submission_tip:
            " Les soumissions ont été notées, elles ne peuvent pas être fixé inédit ",
        Course_future_enrollment: " Inscriptions futures ",
        Course_past_enrollment: " Inscriptions passées ",
        Course_start_end_time: " Temps ",
        Course_joined_tip: " A rejoindre ",
        enroll_as_student_pre: ' Etes-vous sûr de vous inscrire à"',
        enroll_as_student_suf: '" en tant qu' + " ' " + "étudiant?",
        Course_enroll_title:
            " Etes-vous sûr de vouloir importer ce cours dans votre compte étudiant ?",
        No_more_course_tip: " Plus de données de cours ",
        Course_name_length_tip:
            " La longueur de nom de cours ne peut pas au-delà de 200 caractères ",
        Course_visible_public: "Public",
        Course_visible_course: " cours ",
        Course_visible_institution: "Institution",
        concludeTip: ` Avertissement : La conclusion du cours archivera tout le contenu du cours et vous empêchera de modifier les notes.
    Si vous souhaitez conserver la possibilité de changer de notes tout en limitant l'accès des étudiants au cours, veuillez utiliser les paramètres des dates de cours.`,
        Confirm_Conclude_Course: " Confirmer la fin du cours ",
        /* --------------end: course课程-----------------*/
        /* ------------------------大纲---------------------*/

        /* ------------------------end:大纲---------------------*/
        /* --------------start: file 文件-----------------*/
        Search_Files: " Recherche de fichiers ",
        Date_Created: " Date de création ",
        Modified_By: " Modifié par ",
        Date_Modified: " Date de modification ",
        Size: " Taille ",
        View_File: " Vue ",
        Manage_Access: " Gérer l" + " ' " + "accès ",
        Download: " Télécharger ",
        Editing_permissions: " Modification les autorisations de ",
        Rename: " Renommer ",
        Restricted_Access: " Accès restreint ",
        hidden_Files_Text:
            " Cachés, les fichiers à l" +
            " ' " +
            "intérieur seront disponibles avec des liens ",
        unlimited: " illimité",
        Schedule_student_availability:
            " Planifier la disponibilité des étudiants ",
        Available_From: " Disponible à partir de ",
        // 'Available_From': ' Non disponible jusqu'à',
        Available_Until: " Disponible jusqu" + " ' " + "à",
        select_Date: " Sélectionner la date ",
        move_Title: " Où voulez-vous déménager?",
        copy_folder: " Copier ",
        Delete_Alarm: " Supprimer l" + " ' " + "alarme ",
        Delete_Text: " Etes-vous sûr que vous voulez supprimer ",
        add_title: " Ajouter dossier ",
        enter_file: " Entrer le nom du dossier SVP ",
        used: "usité",
        folder_empty: " La liste des dossiers est vide ",
        active_name: " Nom actif ",
        start_no_end:
            " L" +
            " ' " +
            "heure de début ne peut pas être plus longue que l" +
            " ' " +
            "heure de fin ",
        del_file_success: " Fichier supprimé avec succès ",
        folder_no_empty: " Le nom du dossier ne peut pas être vide ",
        file_move_success: " Fichier déplacé avec succès ",
        file_copy_success: " Fichier copié avec succès ",
        file_add_succee: " Fichier ajouté avec succès ",
        file_rename_success: " Fichier renommé avec succès ",
        status_change_success: " Statut modifié avec succès ",
        file_not_view:
            " Le format de fichier n" +
            " ' " +
            "est pas disponible pour la visualisation ",

        /* --------------end: file 文件-----------------*/
        /* --------------start: calendar 日历-----------------*/
        event: "Evénement ",
        calendars: " Calendriers ",
        undated: " Durée indéterminée ",
        calendar_feed: " Flux de calendrier ",
        create_new_event: " Créer un nouvel événement ",
        datea: "Date",
        unlock_at: " Déverrouillage à",
        available_from: " Disponible à partir de ",
        // 'available_from': ' Non disponible jusqu'à',
        untila: " Jusqu" + " ' " + "à",
        start_time: " Temps de début ",
        end_time: " Temps de fin ",
        location: " Position ",
        calendar: " Calendrier ",
        select_area_text: " Sélectionnez SVP...",
        more_options: " Plus d" + " ' " + "options ",
        submit: " Soumettre ",
        assignment: " Mission ",
        group: " Groupe ",
        publish: " Publier ",
        my_to_do: " Mon à faire ",
        pls_enter_content: " Entrer le contenu SVP ",
        confirm_delection: " Confirmer la délection ",
        sure_to_delete: " Etes-vous sûr de vouloir supprimer cet événement ",
        edit_event: " Editer l" + " ' " + "événement ",
        sure_del_assignment:
            " Etes-vous sûr de vouloir supprimer cette affectation ?",
        to_do: "à faire ",
        sure_del_toDo: " Etes-vous sûr que vous voulez supprimer cela à faire?",
        edit_todo: " Editer à faire ",
        calendar_feed_intro:
            " Copiez le lien ci-dessous et collez-le dans n" +
            " ' " +
            "importe quelle application de calendrier qui prend des flux iCal (Google Calendar, iCal, Outlook, etc.)",
        download_feed: " Cliquez ici pour télécharger le flux ",
        calendar_events: "Événements calendrier ",
        new_calendar_event: " Nouvel événement calendrier ",
        // 'Duplicate': 'Duplicata',
        Every: " Chaque ",
        addition_ocurre: " occurrence supplémentaire",
        Count: " Compter ",
        Create_Event: " Créer l" + " ' " + "événement ",
        edit_calendar_events: "Editer les événements du calendrier ",
        Update_Event: "Événement de mise à jour ",
        Back_to_Calenda: " Retour au calendrier ",
        address: " adresse ",
        score_shown_as: " Le note est indiqué comme ",
        the_percentage: " Le pourcentage ",
        not_score: " Ne marquez pas ",
        not_include_final:
            " N" +
            " ' " +
            "incluez pas cette affectation dans votre note finale ",
        edit_success: " Modifier succès ",
        enter_active_name: " Entrez le nom de l" + " ' " + "activité SVP",
        length_bettween_20: " la longueur doit entre 3 et 20",
        len_bettwen_1_100: " la longueur doit entre 1 et 100",
        len_bettwen_1_50: " la longueur doit entre 1 et 50",
        update_success: " Mise à jour succès ",
        add_file_success: " Fichier ajouté avec succès ",
        select_calendar_type: " Veuiller sélectionner le type de calendrier ",
        no_link: " Pas encore de lien...",
        add_event_success: " Ajouter l" + " ' " + "événement réussi ",
        edit_event_success: " Modifier l" + " ' " + "événement avec succès ",
        del_event: " Supprimer l" + " ' " + "événement réussi ",
        del_todo_success: " Supprimer ceci pour faire avec succès ",
        add_todo_success: " Ajouter à la liste des chose à faire avec succès ",
        edit_todo_success: " Modifier la liste des chose à faire avec succès ",
        add_asign_success: " Ajouter le devoir avec succès ",
        edit_asign_success: " Modifier le devoir avec succès ",
        del_assign_success: " Supprimer le devoir avec succès ",
        del_discuss_success: " Supprimer la discussion avec succès ",
        del_quize_success: " Supprimer le quiz avec succès ",
        indefinite_date: " Indéterminé",
        without_date: " Sans date ",
        time_not_empty: " Le temps ne peut pas être vide ",
        Temporarily_no_data: " Aucune donnée Temporairement ",
        /* --------------end: calendar 日历-----------------*/
        /* --------------start: people人员-----------------*/
        Everyone: "Tout le monde",
        Everyelse: " Tous les autres ",
        Groups: "Groupes",
        Group: "Groupe",
        Group_Set: " Ensemble de groupe ",
        Student_Groups: "Groupes d'élèves",
        Group_Mess1:
            " Les groupes d’élèves sont un moyen utile d’organiser les élèves pour des projets tels que les projets de groupe ou les communications. Chaque groupe d'élèves dispose de son propre calendrier, de son forum de discussion et de ses outils de collaboration afin de pouvoir s'organiser et travailler ensemble plus efficacement.",
        Group_Mess2:
            "Vous pouvez affecter des élèves de manière aléatoire à des groupes d'une taille spécifique, ou créer et organiser manuellement les groupes. Une fois vos groupes créés, vous pouvez définir les assignations comme étant des 'soumissions de groupe', ce qui signifie que chaque groupe aura une soumission pour tous les utilisateurs de ce groupe",
        Group_Tips:
            "Vous pouvez créer des ensembles de groupes dans lesquels les élèves peuvent s'inscrire par leurs propres moyens. Les élèves ne peuvent toujours appartenir qu'à un seul groupe de l'ensemble. Ils peuvent ainsi s'organiser en groupes au lieu de devoir demander à l'enseignant de faire le travail. tant que cette option est activée, les élèves peuvent passer d’un groupe à l’autre.",
        Self_Sign_Up: " L'auto-inscription est activée pour ces groupes. ",
        Same_Section:
            "Tous les élèves d'un groupe doivent obligatoirement être dans la même section. ",
        Group_Limit: " Les groupes sont limités à ",
        Members: " membres.",
        Message: " Message à tous les élèves non affectés ",
        Randomly: " Attribuer des élèves au hasard ",
        Edit_Group_Set: " Modifier le groupe ",
        Clone_Group: " Groupe de clones ",
        Delete_Group_Set: " Supprimer le groupe ",
        Student_Group_Tips:
            " Ces groupes sont auto-organisés par les élèves. Contrairement aux autres types de groupes, les élèves peuvent appartenir à plus d'un de ces groupes à la fois. Ces groupes ne peuvent donc pas être utilisés pour des travaux notés.",
        Students_title: "Tout le monde",
        Unassigned_title: " Élèves non assignés ",
        Add_Group: " Ajouter un groupe ",
        Edit_Group: " Modifier le groupe ",
        Group_Name: " Nom de groupe ",
        Joining: " Joindre ",
        Send_Message: " Envoyer le message ",
        Message_Students: " Message aux élèves pour ",
        Recipients: " Destinataires:",
        Recipients_tips: " Les élèves n'ayant pas rejoint un groupe ",
        Randomly_Assign: " Assigner des élèves au hasard ",
        automatically_Assign: " Cela assignera automatiquement ",
        all: "tous",
        all_unassigned_students: " tous les élèves non assignés ",
        Assign_Group:
            " aussi uniformément que possible parmi les groupes d’élèves existants.",
        Assign_tips:
            " Ne pouvoir pas restreindre par section sauf si les groupes sont vides et de taille non limitée. Ils doivent avoir au moins un groupe par section. ",
        Require_Section:
            " Exiger que les membres du groupe soient dans la même section ",
        No_Stu:
            " Il n'y a actuellement aucun élève dans ce groupe. Ajoutez un élève pour commencer.",
        No_Group:
            " Il n'y a actuellement aucun groupe dans ce groupe. Ajoutez un groupe pour commencer.",
        Group_Students: "élève(s)",
        Visit_Homepage: " Visiter la page d'accueil du groupe ",
        Delete_Group: " Supprimer le groupe ",
        Move_To: " Déménager à",
        Remove_Leader: "Supprimer le Leader",
        Set_Leader: " Définir comme leader ",
        Move_Student: " Déplacer un élève ",
        Select_Group: " Sélectionner un groupe ",
        Mandatory: " Obligatoire ",
        Characters_Limit: " jusqu'à 100 caractères ",
        Limit_Group: " Limiter les groupes à",
        Limit_Num: " membres (laissez vide pour utiliser le groupe défini max)",
        Free_Join: " Les membres sont libres d'adhérer ",
        Invitation: " Invitation seulement ",
        These_groups_are_self:
            " Ces groupes sont auto-organisés par les élèves. Contrairement aux autres types de groupes, les élèves peuvent appartenir à plus d'un de ces groupes à la fois. Ces groupes ne peuvent donc pas être utilisés pour des travaux notés.",
        groupTitle: "groupTitle",
        Are_you_sure: "Êtes-vous sûr de vouloir supprimer ce groupe?",
        Must_enter_a_positive: " Doit entrer un nombre de groupes positif ",
        Analytics: " Analytique ",
        Login_ID: " Identifiant de connexion ",
        ijohn_mjack: "ijohn,mjack",
        Re_send_lnvitation: " Renvoyer l'invitation ",
        Stu2_was_added_to: " Élève2 a été ajouté au cours ",
        Invitations_aren: " Les invitations ne sont pas ",
        sent_until_the_course_is_published:
            "envoyé jusqu'à la publication des cours ",
        Edit_Course_Role: " Modifier le rôle des cours ",
        Update: " Mise à jour ",
        User_Profile: " Profil de l'utilisateur ",
        Biograply: " Biographie ",
        Remove_From_Course: " Supprimer des cours ",
        Ok: "Ok",
        Stu2_has: "Élève2 a",
        already_received_and_accepted: " déjà reçu et accepté l'invitation ",
        to_join_the_course: " rejoindre le cours, mais vous pouvez ",
        still_re_send_the_invitation: " toujours re-envoyer l'invitation ",
        if_it_is_needed: "si c'est nécessaire.",
        participate_in_the_course:
            "Êtes-vous sûr de vouloir désactiver cet utilisateur? Ils seront  n " +
            "                    incapable de participer au cours en étant inactif.",
        Deactivate_User: " Désactiver l'utilisateur ",
        username_or_group_name: " nom d'utilisateur ou nom de groupe ",
        students: "élèves",
        Visit: "Visite",
        Manage: " Gérer ",
        Join: " Joindre ",
        Switch_To: " Basculer vers ",
        Leave: " Laisser ",
        Group_is_joined_by_invitation_only:
            " Le groupe est uniquement rejoint sur invitation.",
        Course_members_are_free_to_join:
            " Les membres des cours sont libres d'adhérer ",
        Membership_by_invitation_only: " Adhésion sur invitation seulement ",
        Group_Members: " Les membres du groupe ",
        Teachers_TAs:
            "Formateur&TAs" /* --------------end: people人员-----------------*/ /* --------------start: SIS 模块-----------------*/,

        Import: " Importation ",
        select_csv_file:
            " Sélectionnez le fichier CSV que vous souhaitez importer ",
        choose_file: " Choisir le fichier ",
        or_a: " ou un",
        zip_file: " Fichier zip ",
        down_template: " Téléchargez un modèle ",
        no_file_chosen: " Aucun fichier choisi ",
        full_batch_update: " Ceci est une mise à jour complète par lot ",
        full_batch_intro:
            " Si cette option est sélectionnée, tout ce qui concerne ce terme sera supprimé, ce qui comprend tous les cours des inscriptions qui ne figurent pas dans le fichier d'importation sélectionné ci-dessus.",
        pls_select: "Veuillez choisir ",
        override_ui: "Ignorer les modifications de l'interface utilisateur ",
        override_ui_intro:
            " Par défaut, les modifications de l'interface utilisateur sont prioritaires sur les modifications d'importation SIS. Pour un certain nombre de champs, l'importation SIS ne modifie pas les données de ce champ si un administrateur a modifié ce champ via l'interface utilisateur. Si vous sélectionnez cette option, cette importation SIS remplacera l'interface utilisateur. changement.",
        process_data: " Données de processus ",
        last_batch: " Dernier lot ",
        view_import_record: " Voir tous les enregistrements importés ",
        import_files: " Fichiers importés ",
        Result: " Résultat ",
        erro_and_warn: " articles erreurs et avertissements ",
        item_import_success: " articles importés avec succès ",
        Account: " Compte ",
        Courses: " Cours ",
        Sectionsa: " Sections ",
        Enrollments: " Inscriptions ",
        aGroups: " Groupes ",
        aGroup_sets: " Ensembles de groupe ",
        grou_set_users: " Utilisateur du groupe ",
        imported_records: " Enregistrements importés ",
        click_to_view: " Cliquez ici pour voir ",
        click_to_hide: " Cliquez ici pour cacher ",
        or: "ou",
        down_complete_warn:
            " Téléchargez la liste complète des erreurs et des avertissements ici.",
        Processing: " En traitement ",
        may_take_bit: " cela peut prendre un peu ...",
        process_prompt:
            " Le processus d'importation a commencé. Cela peut prendre un certain temps. S'il y a beaucoup à importer, vous pouvez quitter la page et revenir." /* --------------end: SIS 模块-----------------*/,
        /* --------------start: 登录注册 模块-----------------*/
        Role: "Rôle",
        Login: "S'identifier",
        sign_up_free: " Inscription gratuite ",
        login_id: " Identifiant de connexion ",
        password: " Mot de passe ",
        login_as_admin: " Connectez-vous en tant qu'administrateur ",
        login_as_teacher: " Se connecter en tant qu'enseignant ",
        login_as_student: " Se connecter en tant qu'élève ",
        forget_pwd: " Mot de passe oublié",
        pls_select_role: " Veuillez sélectionner votre nom de rôle ",
        pls_enter_username: " S'il vous plaît entrez votre nom d'utilisateur ",
        pls_enter_pwd: " Entrez votre mot de passe s'il vous plait ",
        pls_enter_pwds: " Le mot de passe est de 6 à 30 bits ",
        pls_enter_email: "Entrez votre email s'il vous plait ",
        have_account: " Vous avez déjà un compte ",
        username: " Nom d'utilisateur ",
        confirm_pwd: " Confirmez le mot de passe ",
        phone_number: " Numéro de téléphone ",
        organization: " École / Organisation ",
        role_switch: " Changement de rôle ",

        Teacher: " professeur ",
        Student: "élève",
        aTeacher: " professeur ",
        aStudent: "élève ",
        Ta: "TA",
        Admin: "admin",
        log_out: " Se déconnecter  >",
        Select1: " Sélectionner...",
        email_user: " E-mail ou nom d'utilisateur ",
        limt_6_20: " au moins 6 caractères ",
        limit_4_50: " au moins 4 caractères ",
        range_length:
            " Veuillez entrer une valeur comprise entre {0} et {1} caractères.",
        forgot_pswd_text:
            " Veuillez contacter votre administrateur système de votre institut, il / elle vous dira comment traiter ce problème.",
        pls_enter_pswd_again: " Veuillez resaisir votre mot de passe ",
        two_pswd_nomatch: " Devrait être identique au mot de passe ",
        pls_enter_first_name: " Entrez votre prénom s'il vous plait ",
        pls_enter_last_name: " Veuillez entrer votre nom de famille ",
        pls_select_org: " Veuillez choisir l'organisation ",
        limit_1_60: " La longueur doit être comprise entre 1 et 60",
        limit_1_50: " La longueur doit être comprise entre 1 et 50",
        limit_6_30: " La longueur devrait être comprise entre 6 et 30",
        limit_4_30: " La longueur devrait être comprise entre 4 et 30",
        limit_0_30:
            " Entrez uniquement des nombres entiers positifs compris entre 0 et 65535.",
        regist_success: " Enregistré avec succès ",
        only_be_Numbers_or_letters:
            " devrait être des lettres, des chiffres ou la combinaison des deux " /* --------------end: 登录注册 模块-----------------*/ /* 公用一些按钮 */,
        Edit: " Modifier ",
        Edit_weight: " Groupes d'affectation Pondération ",
        Move_CONTENTS: " Déplacer le contenu ",
        Move_Contents: " Déplacer le contenu ",
        Move_Module: " Module de déplacement ",
        Delete: " Effacer ",
        Duplicate: " Dupliquer ",
        Move_to: " Passer à...",
        Decrease_indent: " Diminuer le retrait ",
        Increase_indent: " Augmenter le retrait ",
        Remove: " Retirer ", // 'Share_to_Commons':' Partager aux communs ',
        Cancel: " Annuler ",
        Title: " Titre ",
        Indent: " Retrait ",
        Update_Module: " Module de mise à jour ",
        Edit_Item_Details: " Modifier les détails de l'élément ",
        Edit_Module_Settings: " Modifier les paramètres du module ",
        Save: " sauver ",
        Disable: " Désactiver ",
        Move: " déplacer ",
        Save_Publish: " Enregistrer et publier ",
        OK: "OK",
        Folder: " Dossier ", // -------- end -----------
        /* -------------assignments作业----------------*/
        Assignment_Group_Item_Name: "Nom",
        Assignment_Group_Item_Score: "Points",
        Edit_Assignment: " Modifier l'affectation ",
        More_Options: " Plus d'options ",
        Add_Assignment_Group: "Groupe",
        Add_Assignment_Item: " Affectation ",
        Move_Group: " Déplacer un groupe ",
        Towards_Final: " Ne comptez pas cette affectation dans la note finale ",
        Group_Assignment: " Affectation de groupe ",
        "Peer-reviewed": "Évalué par les pairs ",
        Notify_Users: " Avertir les utilisateurs que ce contenu a changé",
        Completed_Not_Completed: " Terminé / Non complété",
        Alphabet_score: " Partition de l'alphabet ",
        Not_integral: "Pas intégrale ",
        No_submit: " Aucune soumission ",
        "On-line": " En ligne ",
        Written: "Écrit ",
        External_tools: " Outils externes ",
        On_Paper: " Sur papier ",
        Exiernal_Tool_Options: " Options de l'outil Exiernal ",
        External_Tool_URL: " Exier ou trouver une URL d'outil externe ",
        Load_Tab: " Charger ceci dans un nouvel onglet ",
        Note_Assignment:
            " Les outils externes ne doivent pas être utilisés dans le travail de groupe. Lorsque vous enregistrez, les paramètres du groupe seront affichés comme non cochés.",
        Online_Input_Options: " Options de saisie en ligne ",
        This_is_Assignment_not_edit:
            " Les élèves ont déjà soumis leurs devoirs pour cette tâche. Par conséquent, les paramètres de groupe ne peuvent pas être modifiés.",
        This_is_quiz_not_edit:
            " Les élèves ayant déjà répondu à ce questionnaire, les paramètres de tentatives autorisées ne peuvent pas être modifiés.",
        Text_input: " Entrée de texte ",
        Website_URL: " URL de site web ",
        Media_recording: " Enregistrements de médias ",
        File_upload: " Téléchargement de fichiers ", // Limit_upload: ' Limiter le type de fichier de téléchargement ',
        Limit_upload: " Limiter les types de fichiers à télécharger ",
        find: " trouver ",
        This_is_Group_Assignment: " Ceci est une assignation de groupe ",
        assigned_a_grade: " Chaque élève se voit attribuer une note.",
        Group_Sel: " Groupe Sel ",
        Group_structure: " Structure du groupe ",
        Group_jurisdiction: " Juridiction du groupe ",
        Membership:
            " Adhésion (laissez vide pour qu'il n'y ait pas de restrictions)",
        Leader: "Leader",
        "Need_Peer-reviewed": "Besoin d'un examen par les pairs ",
        "How_to_allocate_Peer-reviewed":
            " Comment allouer les revues avec comité de lecture ",
        "Manual_allocation_of_Peer-reviewed":
            " Affectation manuelle des dossiers examinés par les pairs ",
        "Automated_allocation_of_Peer-reviewed":
            " Affectation automatisée des documents examinés par les pairs ",
        Number_of_reviews_per_user: " Nombre d'avis par utilisateur ",
        Allocation_and_review: " Allocation et révision ",
        deadline:
            " Ce doit être après la date limite. Si c'est vide, utilisez le cut-off.",
        anonymous: " anonyme ",
        Options_bak: "Options",
        Avaliable_to: " Disponible pour ",
        Adding_Working_Groups: " Ajouter un groupe d'affectation ",
        Name_to_be_filled_in: " Nom à remplir ",
        For_example: " Par exemple, groupe de papier 1",
        Add_Assignment_to_Assignments:
            " Ajouter une affectation à des affectations ",
        Dues: " Dû ",
        Edit_Assignment_Group: " Editer le groupe d'affectation ",
        Cancel_Publish: " Annuler la publication ",
        Add_Work_Group_Valid: " Le nom du groupe est requis ",
        Add_Work_Group_length:
            " Longueur du nom du groupe d’affectation supérieure à 1, inférieure à 200",
        Add_Assignment_To_Assignments_Valid: " Le nom est requis ",
        Add_Assignment_To_Assignments_Valids:
            "Entrez un score s'il vous plaît ",
        Add_Assignment_To_Assignments_length:
            " Longueur du nom supérieure à 1, inférieure à 50",
        Edit_Assignment_Group_Valid: " Le nom du groupe doit être rempli ",
        Edit_Assignment_Group_length:
            " Longueur du nom de groupe supérieure à 1, inférieure à 200",
        Edit_Assignment_Group_Item_Valid: " Le nom du groupe doit être rempli ",
        Edit_Assignment_Group_Item_length:
            " Nom du devoir longueur supérieure à 1, inférieure à 50",
        Unnamed_Discuss: " Discuter sans nom ",
        Group_set_error:
            " Veuillez sélectionner un groupe pour cette affectation ",
        Delete_Assignment: " Supprimer l'affectation ",
        Delete_Assignment_Confirm:
            "Êtes-vous sûr de vouloir supprimer cette affectation?",
        Delete_Assignment_Group: " Supprimer le groupe d'affectation ",
        Delete_Assignment_Group_Confirm:
            "Êtes-vous sûr de vouloir supprimer ce groupe de tâches?",
        IsIncludeGradeWarn:
            " Cette affectation ne compte pas pour la note finale.",
        selectFileTypeWarning:
            "Entrez une liste d'extensions acceptées, par exemple: doc, xls, txt ",
        Move_Content: " Déplacer le contenu ",
        Move_Content2: " Déplacer le contenu dans ",
        Source_Assignment_Group: " Groupe d'affectation source ",
        Target_Assignment_Group: "Groupe d'affectation cible ",
        final_grade: " Cette tâche ne compte pas pour la note finale ",
        Yes: "Oui",
        Submission_Type_Assignment: " Type de soumission ",
        assignment_attotion:
            " Tous les utilisateurs ne sont autorisés à tenter plus de 50 tentatives par défaut Ceci est votre dernière tentative disponible Souhaitez-vous soumettre cette tâche maintenant?",
        delete_success: " Supprimer réussi！",
        delete_cancel: " Suppression annulée ",
        of_the_Total: " du total " /* -------- end -----------*/,
        // -------- Dashboard -----------//
        Dashboard_no_to_do_tip: " aucune donnée à faire ",
        Dashboard_no_coming_up_tip: " pas de données à venir ",
        Dashboard_to_do: "à faire",
        Dashboard_More: "Déplacer",
        Dashboard_for_all_course: " pour tous les cours ",
        Dashboard_no_course_tip:
            " Aucun cours ne peut être montré maintenant. S'il vous plaît créez votre cours, alors vous le verrez ici.",
        Dashboard_student_no_course_tip:
            " Aucun cours ne peut être montré maintenant. S'il vous plaît, ajoutez d'abord le cours à Dashboard, puis vous le verrez ici.",
        Dashboard_grade: " Classé",
        Dashboard_deal_with: " Traiter avec ",
        Dashboard_submit: " Soumettre ",
        Dashboard_up_coming: "À venir ",
        Dashboard_due: "Dû",
        Dashboard_to_bo_grade: "être Grade ",
        Dashboard_to_bo_deal_with: "être traité avec ",
        Dashboard_to_bo_submit: "être soumis ",
        Decline: " Déclin ",
        Accept: "Accepter",
        You_Have_been_invited_to_join: " Vous avez été invité à rejoindre ",
        as_a: "comme un", // -------- Dashboard End-----------//
        /* --------------start:人员模块-----------------*/
        People_people: " Personnes ",
        People_nickname: " Surnom ",
        People_full_name: " Nom complet ",
        People_username: " Identifiant de connexion ",
        People_section: " Section ",
        People_email: "Email",
        People_sis_id: "SIS ID",
        people_institution: " Institution ",
        People_role: "Rôle",
        People_last_activity: " Dernière Activité",
        People_total_activity: " Activité totale ",
        People_inactive_tip: " inactif ",
        People_pending_tip: " en attente ",
        People_deactivate_success: " Désactivé avec succès ",
        People_activate_success: " Réactiver le succès de l'utilisateur ",
        People_deactivate_user_tip:
            "Êtes-vous sûr de vouloir désactiver cet utilisateur? Ils ne pourront pas participer au cours tant qu’ils ne sont pas actifs.",
        People_remove_user_from_course_tip:
            "Êtes-vous sûr de vouloir supprimer cet utilisateur?",
        People_remove_from_course: " Supprimer des cours ",
        People_edit_section: " Modifier la section ",
        People_edit_role: " Modifier le rôle ",
        People_user_detail: "Détail de l'utilisateur ",
        People_to_deactivate: " Désactiver l'utilisateur ",
        People_to_activate: " Réactiver l'utilisateur ",
        People_edit_user_role_tip:
            " Si cet utilisateur a plusieurs rôles dans le cours. Changer leur rôle ici écrasera toutes leurs inscriptions actuelles.",
        People_edit_user_role_no_role_tip:
            " Veuillez sélectionner un rôle d'utilisateur ",
        People_edit_user_role_success_tip:
            " Mettre à jour le succès du rôle d'utilisateur ",
        People_eidt_user_section_success_tip:
            " Mise à jour du succès de la section utilisateur ",
        People_section_enrollments: " Inscriptions de section ",
        People_section_edit_tip:
            " Les sections sont un moyen supplémentaire d’organiser les utilisateurs. Cela peut vous permettre d'enseigner plusieurs classes d'un même cours, de sorte que vous puissiez avoir le contenu du cours au même endroit. Vous pouvez déplacer un utilisateur vers une autre section ou ajouter / supprimer des inscriptions à une section. Les utilisateurs doivent être dans au moins une section à tout moment.",
        People_section_rm_empty_tip:
            " Les utilisateurs doivent être dans au moins une section.",
        People_user_add_tip:
            " Lorsque vous ajoutez plusieurs utilisateurs, utilisez une virgule ou un saut de ligne pour séparer les utilisateurs.",
        People_next: " Prochain ",
        People_add_people_by_tip: " Ajouter utilisateur (s) par ",
        People_add_people: " Ajouter des personnes ",
        People_add_people_has_user_tip:
            " Les utilisateurs suivants sont prêts à être ajoutés au cours.",
        People_add_people_empty_user_tip:
            " Il n'y a pas d'utilisateur à ajouter.",
        People_add_people_start_over: " Recommencer ",
        People_add_people_add_users: " Ajouter des utilisateurs ",
        People_study_group_description_ch1:
            " Les groupes d’élèves sont un moyen utile d’organiser les élèves pour des projets tels que les projets de groupe ou les communications. Chaque groupe d'élèves dispose de son propre calendrier, de son forum de discussion et de ses outils de collaboration afin de pouvoir s'organiser et travailler ensemble plus efficacement.",
        People_study_group_description_ch2:
            " Vous pouvez affecter des élèves de manière aléatoire à des groupes d'une taille spécifique, ou créer et organiser manuellement les groupes. Une fois vos groupes créés, vous pouvez définir les assignations comme étant des 'soumissions de groupe', ce qui signifie que chaque groupe aura une soumission pour tous les utilisateurs de ce groupe.",
        People_Join_type_free: " Les membres des cours sont libres d'adhérer ",
        People_Join_type_invite: " Adhésion sur invitation seulement ",
        People_study_group_set_delete_tip: "Voulez-vous supprimer ce groupe?",
        People_study_group_set_name: " Nom du groupe ",
        People_study_group_set_new_name: " Nouveau nom de groupe ",
        People_study_group_set_self_signup: " Auto-inscription ",
        People_study_group_set_allow_self_signup: "Tous s'inscrire ",
        People_study_group_set_self_signup_desc:
            " Vous pouvez créer des ensembles de groupes dans lesquels les élèves peuvent s'inscrire par leurs propres moyens. Les élèves ne peuvent toujours appartenir qu'à un seul groupe de l'ensemble. Ils peuvent ainsi s'organiser en groupes au lieu de devoir demander à l'enseignant de faire le travail. tant que cette option est activée, les élèves peuvent passer d’un groupe à l’autre.",
        People_study_group_set_limit_same_section:
            " Exiger que les membres du groupe soient dans la même section ",
        People_study_group_set_group_now_pre: "Créer",
        People_study_group_set_group_now_suf: " Groupes actuels",
        People_study_group_set_member_limit_pre: " Limiter les groupes à",
        People_study_group_set_member_limit_suf:
            "Membres ((Laisser vide pour utiliser la valeur maximale)",
        People_study_group_set_split_student_pre: " Séparer les étudiants en ",
        People_study_group_set_split_student_suf: "Groupes",
        People_study_group_set_manually_create:
            " Je crée un groupe manuellement ",
        People_study_group_set_leadership: "Leadership",
        People_study_group_set_group_structure: " Structure de groupe ",
        People_study_group_set_manage_group:
            " Gérer le groupe d" + " ' " + "étudiants ",
        People_study_group_set_create_title: " Créer un emsemble de groupes",
        People_study_group_set_edit_title: " Modifier un emsemble de groupes ",
        People_study_group_set_rule_name:
            " La longueur doit être d" + " ' " + "entre 1 et 100.",
        People_study_group_set_rule_member_min_limit:
            "Les membres du groupe doit être plus que",
        People_study_group_student_group_desc:
            " Les groupes sont un bon endroit pour collaborer à des projets ou pour établir les horaires des séances d'étude. et ce genre de choses. Chaque groupe reçoit un calendrier, un wiki, des discussions et un peu d'espace de stockage. fichiers. Les groupes peuvent collaborer sur des documents, ou même programmer des conférences Web. C'est vraiment comme un mini-cours où vous pouvez travailler avec un plus petit nombre d'étudiants sur un projet plus ciblé.",
        People_study_group_group_name: " Nom du Groupe ",
        People_study_group_group_join_type: "Adhésion ",
        People_study_group_group_invite: "Invitation",
        People_study_group_group_members: "Membres",
        People_study_group_set_delete: " Supprimer un emsemble de groupes ",
        People_study_group_set_assign_randomly:
            " Attribuer les étudiants aléatoirement ",
        People_study_group_set_clone: "Cloner un emsemble de groupes ",
        People_study_group_set_add_to_group: " Ajouter au groupe ",
        People_study_group_set_clone_name_required: " Le nom est obligatoire ",
        /* ------------------- 人员模块 END ----------------*/

        /* ----------------------start: 学期 term--------------------------*/
        Term_Name: "Nom du trimestre",
        SIS_ID: " ID SIS ",
        Term_Runs_From: " Le trimestre débute à partir de ",
        To: "à",
        Students_Can_Access_From: " Les étudiants peuvent accéder de ",
        Teachers_Can_Access_From: "Les enseignants peuvent accéder de ",
        TAs_Can_Access_From: "Les AEs peuvent accéder de ",
        Create_Term: " Ajouter un nouveau trimestre",
        courses: "Cours",
        Term_Detail: " Détails du trimestre ",
        whenever: "à tous moments",
        Term_Start: " Démarrage du trimestre ",
        Term_End: "Fin du trimestre",
        Delete_Term: "Supprimer un trimestre",
        Delete_Term_Confirm: " Voulez-vous vraiment supprimer ce trimestre?",
        Delete_Term_Confirm_Course:
            " Vous ne pouvez pas supprimer le trimestre qui contient des cours, supprimer les cours inclus avant de supprimer le trimestre.",
        Edit_Term: "Editer le trimestre",
        Name_Valid: " Entrer le nom du trimestre ",
        addOrEditTitle: " ajouter ou modifier le titre ",
        /* ----------------------end: 学期 term--------------------------*/
        /* --------------------------adminSettings模块------------------------*/
        Mail_Configuration: " Configuration de mail ",
        Open_Email_Service: "Commencer le service d" + " ' " + "email ",
        Open_Email_Verification:
            " Commencer l" +
            " ' " +
            "inscription de vérification d" +
            " ' " +
            "email ",
        Open_Email_Retrieval:
            " Commencer le service de récupération de mot de pass d" +
            " ' " +
            "emails ",
        Open_Email_Push_System:
            " Commencer le service de notification de système de poussée d" +
            " ' " +
            "email ",

        /* ------------------- 管理员模块 START ----------------*/
        Account_Settings: " Paramètres du compte ",
        Account_Name: " Nom du compte ",
        Default_Language: " Langue par défaut ",
        Default_Time_Zone: " Fuseau horaire par défaut ",
        // Default_View_for_Dashboard: ' Vue de tableau de bord par défaut ',
        // 'Autoriser l'Auto-inscription ': ' Autoriser l'Auto-inscription ',
        Restriction_Settings: " Restriction de Paramètres ",
        Dont_let_teachers_rename_their_courses:
            " Empêcher les enseignants de renommer leurs cours ",
        Restrict_students_from_viewing_quiz_questions_after_course_end_date:
            " Empêcher les étudiants de consulter les questions de quiz après la date de fin de cours ",
        Restrict_students_from_accessing_courses_before_start_date:
            " Restreindre l" +
            " ' " +
            "accès des étudiants aux cours avant la date de démarrage ",
        Restrict_students_from_accessing_courses_before_end_date:
            " Restreindre l" +
            " ' " +
            "accès des étudiants aux cours avant la date de fin ",
        Disable_comments_on_announcements:
            " Interdire les commentaires sur les annonces ",
        Features: " Caractéristiques ",
        Open_Registration: " Inscription ouverte",
        Users_can_edit_their_name:
            " Les utilisateurs peuvent modifier leur nom ",
        //     ' Les utilisateurs peuvent supprimer leur adresse e-mail attribuée par l'institution':
        // ' Les utilisateurs peuvent supprimer leur adresse e-mail attribuée par l'institution',

        admin_Add_a_New_User: " Ajouter des utilisateurs ",
        Search_People: " Rechercher des personnes ",
        admin_people: " Personnes ",
        Remove_avatar_picture: " Supprimer l'image d'avatar ",
        only_letters_numbers_and_downline_are_acceptable:
            " seules les lettres, les chiffres et les lignes sont acceptables ",
        avatar_picture:
            " Voulez-vous supprimer la photo d'avatar de cet utilisateur?",
        Last_request: " Dernière requete ",
        admin_nickname: " Surnom ",
        admin_section: "Classe",
        admin_email: "E-mail",
        admin_sis_id: " ID SIS ",
        admin_last_login: " Dernière connexion ",
        admin_firstName: " Prénom ",
        admin_lastName: " Nom de famille ",
        admin_loginId: " ID de Connexion ",
        admin_subOrg: " Sous-compte",
        admin_Edit_User: " Modifier les détails de l" + " ' " + "utilisateur ",
        Name_and_Email: "Nom et Email",
        Profile_picture: " Photo de profil ",
        Login_Information: " Informations de connexion ",
        Reset_password: " Réinitialiser le mot de passe ",
        Account_Admin: " Administrateur de compte ",
        admin_people_remove:
            " Voulez-vous vraiment supprimer cet utilisateur de l" +
            " ' " +
            "institut de compte?",
        Add_New_Sub_Account: " Ajouter un nouveau sous-compte",
        Edit_Sub_Account: "Modifier le sous-compte",
        Sub_Account: "Sous-compte",
        Edit_school_Account: "Modifer compte de l’école",
        firstName: " Veuillez entrer un prénom ",
        lastName: " Veuillez entrer un nom de famille",
        loginId: " Veuillez entrer un ID de connexion",
        "Sub-Account_tit": " Veuillez entrer un nom de sous-compte",
        admin_org_remove:
            " Etes-vous sûr que vous voulez supprimer ce sous-compte de l" +
            " ' " +
            "institut de compte?",
        allName: " Tous les noms ",
        loginname: "Nom de connexion",
        loginemail: "Email",
        activityName: " Veuillez entrer le nom de l" + " ' " + "activité",
        activityNames: " ID de connexion ou ID SIS est obligatoire",
        reqireSubAccont: " Sous-compte requis ",
        Sub_agency: "Sous-compte",
        Sub_agencys: " Sous-comptes",
        Course_number: "Cours",
        Course_numbers: "Cours",
        UserSetting_cancel: "Supprimer",
        UserSetting_next: "Suite",
        UserSetting_prev: " Précédent",
        UserSetting_submit: "Soumettre",
        UserSetting_please_select_email: " Veuillez choisir le mailbox",
        UserSetting_please_select_lanuage: " Veuillez choisir la langue",
        UserSetting_example: "Exemple:ijohn,mjack",
        UserSetting_Login_ID: " ID de Connexion ",
        UserSetting_SIS_ID: " ID SIS ",
        // UserSetting_add_user(s)_by: "Ajouter un ou des utilisateurs par ",
        /* ------------------- 管理员模块 END ----------------*/

        /* --------------start: 个人首页及设置 模块-----------------*/
        UserSetting_no_contact_tip:
            " Aucun contact n" + " ' " + "a été établi.",
        UserSetting_no_description_tip:
            " La biographie n" + " ' " + "a pas été fixée.",
        UserSetting_no_links_tip: " Aucun lien n" + " ' " + "a été établi.",
        UserSetting_delete_links_tip: " Lien supprimé avec succès.",
        UserSetting_update_success_tip:
            " Paramètre d’utilisateur mis à jour avec succès.",
        UserSetting_password_success_tip:
            "Mot de passe mis à jour avec succès.",
        UserSetting_password_error_tip:
            " Erreur de l" + " ' " + "ancien mot de passe!",
        UserSetting_email_success_tip: " Email ajouté avec succès.",
        UserSetting_email_delete_tip: " Email supprimé avec succès.",
        UserSetting_email_error_tip: "l’Email a été utilisé.",
        UserSetting_Full_Name: " Nom entier ",
        UserSetting_first_Name: "Prénom",
        UserSetting_last_Name: "Nom",
        UserSetting_Display_Name: "Afficher le nom",
        UserSetting_Default_Email: "Email par défaut ",
        UserSetting_Language: "Langue",
        UserSetting_Update_Settings: "Mettre à jour les paramètres",
        UserSetting_mechanism: "Mécanisme",
        UserSetting_please: "Veuillez choisir l" + " ' " + "organization",
        UserSetting_Password_Title: "Changer le mot de passe",
        UserSetting_Password_Old_Error:
            " Veuillez entrer le correct mot de passe ",
        UserSetting_Password_Confirm_Error:
            " Doit être identique au nouveau mot de passe ",
        UserSetting_Email_Title: "Ajouter un contact",
        UserSetting_Simplified_Chinese: " Chinois simplifié",
        UserSetting_english: "Anglais",
        UserSetting_Cancel: "Supprimer",
        UserSetting_Save: " Sauvegarder ",
        UserSetting_reset_password: " Réinitialiser le mot de passe ",

        /* --------------end: 个人首页及设置 模块-----------------*/
        /* --------------start: grade 评分模块-----------------*/
        Grade_Delayed: " Retardé",
        Grade_Missed: " Manqué",
        Grade_UnGraded: " Non noté",
        Grade_Filter_Name_Email:
            " Arranger par nom d" + " ' " + "étudiant ou par email ",
        Grade_Back_Task: " Retourner à la tâche de note" + " ' " + "",
        Grade_Back_Book: " Retourner au cahier de note ",
        Grade_Percent_Pts: "Afficher les points totaux avec pourcentage",
        Grade_Letter: " Afficher les points totaux avec lettre de notation",
        Grade_Comprehensive_Analytics: " Analyse complète ",
        Grade_Course: "Cours",
        Grade_Section: "Section",
        Grade_Day: "Jour",
        Grade_Week: "Semaine",
        Grade_Section_Switch: " Change de section ",
        Grade_UnAssigned_tip:
            " Non affecté : La mission marquée n" +
            " ' " +
            "est pas attribuée à l" +
            " ' " +
            "étudiant correspondant.",
        Grade_AssignmentType: "Type",
        Grade_discussion: "Discussion",
        Grade_quiz: "quiz",
        Grade_assignment: "Devoir",
        Grade_isGradeAssignment: " Tâche de Groupe ",
        Grade_Available_Time: " Temps disponible ",
        Grade_Due_Time: " Temps dû ",
        Grade_No: "Non",
        Grade_Yes: "Oui",
        Grade_Close_Time: " Temps de fermeture ",
        Grade_Multiple_Dates: " Dates multiples ",
        Grade_out_of: " Sur",
        Grade_No_Data: " Aucune donnée à afficher ",
        Grade_Due: "Dû",
        Grade_Late: " En retard ",
        Grade_Missing: "Manqué",
        Grade_Score: "Score",
        Grade_Percent: "Pourcentage",
        Grade_Ranking: "Classement",
        Grade_High: " Les tops 10",
        Grade_Low: "Les derniers 10",
        Grade_partcipations_title:
            " Le nombre d" + " ' " + "utilisateur par activité",
        Grade_posts_comment:
            " Publier un nouveau commentaire à une discussion ou une annonce",
        Grade_submits_quiz: "Soumettre un quiz",
        Grade_submits_assignment: "Soumettre un devoir",
        Grade_Letter_Grades: " lettre de notation",
        Grade_name: "Nom",
        Grade_Range: "Échelle",
        Grade_all_missions: "Pour toutes les tâches",
        Grade_Parcitipation_date: " Participation par date ",
        Grade_Status_Submissions: "État de soumission ",
        Grade_On_Time: "À l" + " ' " + "heure ",
        Grade_No_Submission: " aucune soumission aucun score ",
        Grade_submitted_UnGraded: " Soumis et noté ",
        Grade_Scores_Letter: "Score par lettre",
        Grade_person_time: "(personne et temps de tâche)",
        Grade_Task: " Tâche de note ",
        Filter_student: "Filtrer par nom",
        Back_grade: "Retourner à la tâche de note",
        Grade_Book: "Cahier de note ",
        Submission_Type: " Type de Soumission:",
        Submit_Status: "État de Soumission ",
        Graded_Status: "État de note",
        Mission_Group: " Groupe de tâche",
        Group_Mission: "Pour groupe de tâche seulement",
        Group_unSub: "Non soumis",
        Group_Submitted: "Soumis",
        Group_Summery: " Résumé de note",
        Group_Points_possible: "Points possibles",
        Group_Average_Score: " Score moyen ",
        Group_High_Score: " Score élevé",
        Group_Low_Score: "Score bas",
        Group_Total_Stu: "Étudiant total",
        Group_Score: "Score",
        Group_checked:
            " Lorsqu’il est sélectionné, les étudiants ne recevront pas de notifications sur le classement et les commentaires.",
        Group_all_graded:
            " Lorsqu’il est sélectionné, toute note inférieure à celle fixée sera notée comme celle fixée. ",
        Group_enter_comments_here: "Entrer le commentaire ici......",
        Group_Set_Lowest_Score: " Définir le score le plus bas ",
        Grade_Chart_Show: " affichage sous forme de graphique ",
        Grade_Table_Show: " affichage sous forme de table ",
        Grade_Time: "Temps",
        Grade_Participation: "Participation",
        Grade_Mission_Name: "Nom de tâche",
        Grade_Status: "État",
        Grade_Due_At: "Dû à",
        Grade_Submitted_At: "Soumis à",
        Grade_Scores: "Scores",
        Grade_Letter_Scores: " Scores en lettre",
        Grade_Amounts: " Montants ",
        Grade_Comments: "Discussion",
        Grade_Quize: "Quiz",
        Grade_Assignments: "Devoirs",
        Grade_Section_Score:
            " Nombre de lettre de notation pour chaque étudiant et chaque tâche ",
        Grade_Student_Score: " Nombre de lettre de notation pour chaque tâche ",
        No_Data_to_be_Displayed: " Aucune donnée à afficher ",
        Batch: " Lot ",
        Grade: " Classe ",
        individual: " individuel ",
        Have_Submitted: " Ont soumis ",
        group_and: " groupe (s) et ",
        student_s: "élève (s)",
        returned: " revenu ",
        unG_Graded: " ung / classé",
        Stu_ungraded: " Stu non classé",
        Complete: "Complète",
        Incomplete: "Incomplète",
        out_of: " hors de ",
        Over_Write_the_Graded: " Plus d'écrire le noté",
        Submit: " Soumettre ",
        Haven_been_Graded: " N'ont pas été notés ",
        been_Graded: " Ont été notés ",
        The_score_must_be_positive_integer:
            " Le score doit être un entier positif ",
        No_filter_returned_Stu: " Aucun filtre n'a renvoyé Stu. doit être noté",
        Done: "Fait",
        Student_Name: "Nom d’élève",
        This_is_not_counted: " Ceci n'est pas compté dans la note finale ",
        Not_Submitted: " Non transmis ",
        Unscored: " Non marqué",
        lack_of_hand: " manque de main ",
        late_late: " en retard ",
        Overdue_score: " Score de retard ",
        of_grade: " de grade ",
        Total: "Total",
        unabsorbed: " non absorbé",
        back_to_Grade_Task: " retour à la tâche de classe ",
        one_by_one: " un par un ",
        Submitted: " Soumis ",
        This_attemp_took: " Cette tentative a pris ",
        Submission_to_view: " Soumission à voir ",
        Uploaded_Files: " Fichiers téléchargés ",
        URL: "URL",
        open_in_new_tab_window: " ouvrir dans un nouvel onglet ",
        Subjectivity: " Subjectivité",
        Easy_Question: "Question Facile",
        Answer: "Réponse",
        Objective: "Objectif",
        Final_Score: " Score final ",
        Update_Scores: " Mettre à jour les scores ",
        No_data_to_be_shown_for_your_selection:
            " Aucune donnée à afficher pour votre sélection.",
        Mute: " Muet ",
        if_checked_students:
            " Si cette case est cochée, les élèves ne seront pas informés de la notation et des commentaires.",
        Hide_Stu_Name: " Masquer Stu. Nom ",
        GradedStatus: "État noté",
        for_this_student: " score d'entrée ici pour cet élève.",
        for_this_group: "score d'entrée ici pour ce groupe.",
        Send_comments_to_student: " Envoyer des commentaires à l'élève ",
        Enter_comments_here: " Entrez les commentaires ici ......",
        Group_Assignment_comments:
            " Ceci est une assignation de groupe, les commentaires seront envoyés à  n " +
            "                            tous Stu. du groupe actuel。",
        Comments_Dialog: " Commentaires Dialogue ",
        by_Submit_Time: " par Submit Time ",
        by_Alphabetical_Name: " par nom alphabétique ",
        second_s: "seconde(s)",
        minute_s: "minute(s)",
        hour_s: " heure(s)",
        Please_input_comment_content_firstly:
            " Entrez le contenu du commentaire en premier s'il vous plaît ",
        Parcitipation: " Participation ",
        Submission_Status: "État de la soumission ",
        On_Time: "À temps ",
        Late_Late: "en retard",
        Missing: " Manquant ",
        Letter_Grades: " Lettres ",
        Scores_by_Letter: " Partitions par lettre ",
        Missions: "Missions",
        Submission: " Soumission ",

        /*11/21后加评分*/
        MissionType: "MissionType",
        //Haven_been_Graded:'Pas encore classifié',
        Have_been: "Déjà classifié",
        Discussion: "Débat ",
        Batch_Grade: "Batch Grade",
        Grade_one_by_one: "Classification un par un",
        unG: "unG",
        AverScore: "Moyenne ",
        Nothing_displayed:
            "Non affiché, veuillez modifier les conditions d 'interrogation ou publier la Mission pour les étudiants.",
        Kept: "Maintenir ",
        ePortfolios: "ePortefeuille",

        /* --------------end: grade 评分模块-----------------*/
        undelete: " restituer ",
        ADMIN: {
            restPasswordTip:
                " Confirmer que le mot de passe réinitialisé est 12345678?",
            removeOrgTip:
                " Vous ne pouvez pas supprimer ce sous-compte qui contient des cours, veuillez supprimer les cours inclus avant de supprimer le sous-compte.",
            schoolAccount: "Compte d" + " ' " + "école",
            rootAccount: " Compte de racine ",
            title: " titre ",
            accountName: " nom du compte ",
            Edit_Root_Account: " Modifier le compte racine ",
            Root_Account_Name: " Nom du compte racine ",
            Edit_Sub_Account: " Modifier le sous-compte ",
            Sub_Account_Name: " Nom du sous-compte ",
            success: " succès!"
        },
        /* ------------------- 公告模块 start ----------------*/
        ANNOUNCE: {
            TOPIC_TITLE: " Titre du sujet ",
            POST_TO: " Poster à",
            ATTACHMENT: " Pièce jointe ",
            DELAY_PUBLISH_AT: "Poster à",
            AOLLOW_USERS_TO_COMMENT:
                " Permettre aux utilisateurs de commenter ",
            SELECT_DATE: " Sélectionner la date ",
            CLICK_TO_UPLOAD: "Télécharger",
            ALL: "Tous",
            Unread: "Non lu(e)(s)",
            ANNOUNCEMENT: "Announce",
            POST_ON: "Poster à",
            BY: "Par",
            REPLY: "Répondre",
            ALL_SECTIONS: "Toutes les sections",
            SECTIONS: "Sections",
            MARK_ALL_AS_READ: " Marquer tout comme lu ",
            SEARCH_TITLE_OR_AUTOR: " Chercher par titre ou auteur",
            Content_is_required: " Le contenu est requis ",
            No_Data: " Pas de données ",
            You_are_about_to_delete:
                " Vous êtes sur le point de supprimer cette annonce. Êtes-vous n " +
                "                    sûr？",
            Comments_are_available: " Les commentaires sont disponibles ",
            Comments_are_unavailable: " Les commentaires sont indisponibles ",
            Announcement_deleted_successfully:
                " Annonce supprimée avec succès ",
            There_are_no_announcements_to_show_in_this_section:
                " Il n'y a pas d'annonces à afficher dans cette section ",
            Click_here_to_add_an_announcement:
                " Cliquez ici pour ajouter une annonce ",
            You_are_about_to_delete_this_announcement:
                " Vous êtes sur le point de supprimer cette annonce.Êtes-vous \n" +
                "                    sûr？"
        },
        /* ------------------- 公告模块 end   ----------------*/

        /* ------------------- 课程设置 start ----------------*/
        COURSE: {
            course_enrollment_title: "Inscription au cours",
            course_enrollment_course_name:
                " Vous êtes maintenant dans l" +
                " ' " +
                "étape de s" +
                " ' " +
                "inscrire au cours ",
            course_enrollment_login_id: " ID de connexion ",
            course_enrollment_password: "Mot de passe",
            course_enrollment_submit: " S" + " ' " + "inscrire au cours ",
            course_limit_text: " Ce cours n'est pas disponible pour vous "
        },

        COURSE_SETTING: {
            course_section: " Sections du cours ",
            section_name: "Nom de section ",
            n_user: "Utilisateurs",
            add_section_tip: "Ajouter une nouvelle section",
            add_section: "Ajouter une section",
            section_name_empty_tip: "Nom de section est obligatoire",
            course_name: "Nom du cours :",
            course_code: " Code du cours :",
            course_sisId: " ID SIS :",
            sub_account: "Sous-compte :",
            student_participate_time_tip:
                " Les étudiants peuvent participer au cours uniquement entre ces dates ",
            student_view_restrict_tip:
                " Lorsqu’il est sélectionné, cette section du cours est en lecture seule en dehors de ces dates. Si les dates du cours sont vierges, ces dates de début et de fin s" +
                "'" +
                "appliquent aux dates de trimestre ",
            language_set_tip:
                " Cela va surmonter toutes les préférences linguistiques du système. Ceci n" +
                "'" +
                "est recommandé que pour les cours de langue étrangère ",
            include_course_to_public_index: " Partager sur ressources ",
            format: "Format :",
            format_campus: " Sur le campus ",
            format_online: " en ligne ",
            format_blended: " Mixte",
            description: "Description :",
            more_options: " Plus d" + " ' " + "options ",
            less_options: " Moins d" + " ' " + "options ",
            allow_sign_up_by_code:
                " Laissez l" +
                " ' " +
                "étudiant s" +
                " ' " +
                "inscrire en partageant avec lui une URL secrete ou un code ",
            allow_attach_file_in_discussion:
                " Laisser les étudiants joindre des dossiers aux discussions ",
            allow_create_discussion:
                " Laissez les étudiants créer des sujets de discussion",
            allow_edit_or_delete_discussion_post:
                " Laissez les étudiants modifier ou supprimer leurs propres publications de discussion",
            allow_organize_group:
                " Laissez les étudiants organiser leurs propres groupes",
            disable_announce_comment:
                " Désactiver commenter sur l" + " ' " + "annonce",
            allow_view_before_start_time:
                " Permettre aux étudiants de voir le cours avant l" +
                " ' " +
                "heure de début du cours",
            allow_view_after_end_time:
                " Permettre aux étudiants de voir le cours après la fin du cours",

            tbl_name: "Nom",
            tbl_teacher: "Enseignant",
            tbl_start_date: "Date de démarrage",
            tbl_end_date: "Date de fin",
            tbl_enrollment: "Inscription",
            tbl_operation: "Opération",
            tbl_joined: "Joint",
            tbl_pending: "En instance",

            section_name_length_range_tip:
                " Longueur du nom de section d' + \" ' \" + 'entre 1 et 100",

            self_enrollment_method: " Méthode d" + " ' " + "auto-inscription ",
            open_enrollment_desc:
                " Ce cours a permis une inscription libre. Les étudiants peuvent s" +
                " ' " +
                "inscrire eux-mêmes au cours une fois que vous partagez avec eux cette URL ",

            conclude_course_success: "Ajouter des courses avec succès ",
            delete_course_success: "Supprimer des cours avec succès ",
            Edit_Section: " Modifier la section ",
            Scheme: " Schème ",
            Grading_Scheme: " Système de classement pour les lettres ",
            This_grading_scheme_is_applied:
                " Ce système de notation est appliqué dans le cours actuel pour chaque tâche, discussion et analyse de notes.",
            Name: "Nom",
            Range: " Gamme ",
            Edit: " Modifier ",
            If_changed_all_later:
                " Si elles sont modifiées, toutes les notes et les analyses de notes des cours seront affectées.",
            to: "à",
            Grading_scheme: " Système de classement ",
            Please_contact_your_system:
                " Veuillez contacter votre administrateur système pour conclure ce cours.",
            delete_this_course:
                " Veuillez contacter votre administrateur système pour supprimer ce cours.",
            Some_ranges_are_incorrect: " Certaines gammes sont incorrectes!",
            Please_check_this_grading_scheme_again:
                " Veuillez vérifier à nouveau ce système de classement!",
            Upload_the_profile:
                " Téléchargez la photo de profil ne doit pas dépasser la taille de 2 Mo.!"
        },
        /* ------------------- 课程设置 end   ----------------*/

        /* --------------start: baseValidate.js基础校验模块提示语----------------*/
        validateAccount_no_specifications_tip:
            " Les comptes ne sont pas conformes aux spécifications.",
        ipAddress_no_specifications_tip:
            " L" +
            " ' " +
            "adresse IP n" +
            " ' " +
            "est pas conforme aux spécifications.",
        ipAddress_empty_description_tip:
            " Veuillez entrer l" + " ' " + "adresse IP.",
        phoneNumber_no_specifications_tip:
            " Le numéro de téléphone mobile n" +
            " ' " +
            "est pas conforme aux spécifications.",
        telephoneNumber_no_specifications_tip:
            " le format du téléphone est incorrect",
        emailValue_no_specifications_tip:
            " Le format de la boîte aux lettres n" +
            " ' " +
            "est pas conforme aux spécifications.",
        idCard_no_specifications_tip:
            " Numéro d" +
            " ' " +
            "ID n" +
            " ' " +
            "est pas conforme aux spécifications.",
        integerP_no_specifications_tip:
            " Seuls les entiers positifs peuvent être remplis.",
        integerN_no_specifications_tip:
            " Seuls les entiers négatifs peuvent être remplis.",
        enText_no_specifications_tip:
            " Seuls les caractères anglais peuvent être remplis.",
        ChEnText_no_specifications_tip:
            " Seuls les numéros et les caractères anglais peuvent être remplis.",
        cnText_no_specifications_tip:
            "Seuls les caractères chinois peuvent être remplis.",
        validateDeviceNo_no_specifications_tip:
            "Veuillez entrer un code à 20 chiffres!",
        validateDeviceNo_error_specifications_tip:
            "Seuls les entiers positifs peuvent être remplis!",
        validateMac_no_specifications_tip:
            " Veuillez entrer l" +
            " ' " +
            "adresse MAC sous la forme de xx-xx-xx-xx-xx-xx!",
        validateTwoNum_no_specifications_tip:
            " Veuillez entrer deux entiers positifs!",
        checkLongitude_no_specifications_tip:
            " La partie longitudinal d" +
            " ' " +
            "entier est 0-180, la partie décimale est 0-6 bits!",
        checkLatitude_no_specifications_tip:
            " La partie de latitude d" +
            " ' " +
            "entier est 0-90, la partie décimale est 0-6 bits!",
        checkURL_no_specifications_tip:
            " Les URL ne sont pas conformes aux spécifications!",
        /* --------------end: baseValidate.js基础校验模块提示语-----------------*/
        /* --------------start: baseValidate.js基础校验模块提示语----------------*/
        share_resource: "Partager à Resource",
        /* --------------end: baseValidate.js基础校验模块提示语-----------------*/
        ASSIGNMENT: {
            description: "Description",
            score: "Points",
            due: "Dû",
            closed: "Fermé",
            students: "Étudiant",
            available: "Disponible",
            availableFrom: "Disponible à partir de",
            available_From: "non disponible avant",
            noCloseDate: " Pas de date de fermeture",
            noAssignmentData: " Pas de devoir dans ce groupe",
            noModuleData: " Pas de module dans ce groupe",
            multiple_module: "Module Multiple",
            multiple_available_date: " Date disponible multiple",
            availableUntil: " jusqu" + " ' " + "à",
            available_Until: "disponible jusqu" + " ' " + "à",
            all_the_time: "tout le temps",
            submitting: "En train de soumettre",
            submitted: "Soumis",
            submission: "Submission",
            assignmentDetail: " Détail de Submission ",
            submitAssignment: "Soumettre le devoir",
            reSubmitAssignment: "Re-soumettre le devoir ",
            file: " Téléchargement de fichiers",
            text: " Entrée de texte",
            media: "Média",
            url: " Url de site web ",
            not_due_time: " Pas de temps dû",
            supportFile: " Type de fichier en support",
            notSupportFile:
                " Ce type de fichier n" +
                " ' " +
                "est pas autorisé. Les types de fichiers acceptés sont",
            comments: "Commentaires",
            commentsTip:
                " Tous les commentaires sont envoyés à l" +
                " ' " +
                "ensemble du groupe.",
            groupTip:
                " Garder à l" +
                " ' " +
                "esprit, cette soumission comptera pour tout le monde en vous ",
            groupTip2: " groupe de parameter groupe",
            fileTip: " Télécharger un fichier.",
            webSiteTip:
                "Copier et coller le lien dans le site Web que vous souhaitez soumettre pour ce devoir.",
            textTip: "Copier et coller ou taper votre soumission ici..",
            mediaTip:
                "Utiliser le lien ci-dessous pour enregistrer votre soumission.",
            lockedUntilTip: "Ce devoir est verrouillé jusqu" + " ' " + "à  ",
            lockedTip: " Ce devoir est verrouillé",
            no_content: " Aucun contenu ",
            titleRequired: "Nom de devoir est obligatoire",
            assignmentGroupRequired: "groupe de devoir est obligatoire",
            Grade: "note:",
            ScorePossiple: " point possible",
            contentInvalid: " rien à soumettre ",
            Published: " Publié ",
            UnPublished: " Non publié",
            Publish: "publier",
            UnPublish: " annuler la publication ",
            of_total_grade: " de la note totale ",
            You_are_about_to_delete: " ous êtes sur le point de supprimer ",
            which_has: " qui a ",
            assignments: " missions ",
            assignment: " mission ",
            in_it: " en cela ",
            Would_you_like_to: " Voudriez-vous ",
            Delete_its_assignments: " Supprimer ses assignations ",
            Move_its_assignments_to: " Déplace ses missions vers ",
            Select_a_Group: " Sélectionnez un groupe ",
            Delete_Group: " Supprimer le groupe ",
            Weight_final_grade:
                " Pondérer la note finale en fonction des groupes d'affectation ",
            Total: "Total",
            the_weight_Points_possible:
                " les points de poids possibles ne peuvent pas être inférieurs à 0",
            weight_Ponits_should:
                " le poids Ponits ne devrait pas être plus de 1,0000!",
            Only_numbers: " Seuls les nombres sont autorisés ici ",
            the_number_range:
                " la plage de chiffres est comprise entre 0 et 10000 ",
            Grading_Scheme: " Schéma de classement ",
            Online_Entry_Options: " Options d'inscription en ligne ",
            Not_all_sections:
                " Cet élément ne sera pas attribué à toutes les sections (étudiants). Souhaitez-vous revenir en arrière pour les ajouter?",
            go_back: " retourner ",
            continue: "continuer",
            Grading_Scheme_for_Letter_Grade:
                " Système de classement pour les lettres ",
            This_grading_scheme_is_applied:
                " Ce système de notation est appliqué dans le cours actuel pour chaque tâche, discussion et analyse de notes.",
            Range: " Gamme ",
            Edit: " modifier ",
            Name: "Nom",
            Grading_Scheme_for: " Système de classement pour les lettres ",
            grading_and_grading_analysis:
                " Si elles sont modifiées, toutes les notes et les analyses de notes du cours en cours seront affectées.",
            to: "à",
            Points_possible_is_required: " Points possibles est requis ",
            Please_specify_at_least:
                " Veuillez spécifier au moins un type de fichier autorisé",
            Confirm_closure: " Confirmer la fermeture?",
            assignment_with_everyone_in_your:
                " Ceci est une tâche de groupe. Vous devrez compléter cette tâche avec tout le monde dans votre!",
            group: "groupe",
            Group_Set_group: " Groupe de groupe!",
            attention: "attention!",
            Upload_timeout: " Délai de téléchargement ",
            File_size_exceeds_quota: " La taille du fichier dépasse le quota!",
            SHOW_BY_TYPE: " S COMMENT PAR TYPE ",
            SHOW_BY_DATE: " MONTRER PAR DATE ",
            No_assignment_in_this_group: " Aucune affectation dans ce groupe ",
            of_the_Total: " du total ",
            There_is_not_any_assignment_right_now:
                " Il n'y a pas de mission en ce moment ",
            overdue_Assignments: " Affectations en retard ",
            Upcoming_Assignments: " Missions à venir ",
            Undated_Assignments: " Cessions non datées ",
            Past_Assignments: " Assignations antérieures ",
            points: "points",
            percentage: " pourcentage ",
            Complete_Incomplete: " Complet / incomplet ",
            Letter_Grade: " Classement par lettre ",
            Not_Graded: " Non coté"
        },

        SIS: {
            noImportRecordTip: "Pas de dossiers d" + " ' " + "importation",
            unknownFileName: "Nom de fichier inconnu",
            fileFormatError: "Le format de fichier est faux",
            fieldTypeError: "Le type de champ est faux",
            fieldFormatErrorSuf: " Le format est faux",
            fieldAssociateValueNotExists:
                " La valeur associée de la valeur de champ n'existe pas",
            fieldDuplicate: "Le champ existe",

            skipUnknownFileType: " Sauter le type de fichier inconnu",
            associateValueNotFound: " Impossible de trouver ",
            fieldValueIsExistsSuf: " exister",
            fieldValueIsEmptySuf: " La valeur est obligatoiree",
            nItemImportSuccess: " articles importés avec succès",
            account: "Organisation",
            user: "Utilisateur",
            term: "trimestre",
            course: "Cours",
            section: "Section",
            enrollment: "Inscription",
            groupSet: "Paramètre de Groupe ",
            group: "Groupe",
            groupUser: "Utilisateur de Groupe",
            valueNotFoundPre: " Impossible de trouver ",
            at: "à",
            rows: " Lignes ",
            downloadCompleteErrorsTip:
                " Téléchargez la liste complète des erreurs et avertissements ici ",
            No_value_given: " Aucune valeur donnée pour "
        },
        /* -------------管理员设置模块-------------------*/
        ADMINSEITING: {
            Admins: " Les admins ",
            Account_Admin: " Administrateur du compte ",
            add_user_by: " ajouter des utilisateurs par ",
            Login_ID: " Identifiant de connexion ",
            SIS_ID: " ID SIS ",
            example_mjack: " exemple: ijohn, mjack ",
            Mail_Configuration: " Configuration du courrier ",
            Open_Email_Service: " Service de messagerie ouvert ",
            Open_Email_Verification:
                " Authentification de courrier électronique ouvert ",
            Open_Email_Retrieval:
                " Ouvrir le service de mot de passe de récupération de courrier électronique ",
            Open_Email_Push_System:
                " Service de notification d 'ouverture d' un système de messagerie électronique ",
            Simple_Mail_Transfer:
                " Un Protocole de transfert de courrier simple (SMTP) pour l 'envoi de courrier électronique.",
            Display_name: " Afficher le nom ",
            SMTP_host: " Hôte SMTP ",
            SMTP_port: " Hôte SMTP ",
            SMTP_security: " Sécurité SMTP ",
            Select: " Choix ",
            SMTP_Auth_Type: " Type d 'authentification SMTP ",
            Common_please_select: " Commun s'il vous plaît sélectionnez ",
            SMTP_username: " Nom d'utilisateur SMTP ",
            SMTP_password: " Mot de passe SMTP ",
            It_will_be_displayed:
                " Il sera affiché avant l'adresse de l'expéditeur en tant que nom de l'expéditeur.",
            Give_the_full_name:
                " Indiquez le nom complet des serveurs SMTP que le système LMS doit utiliser pour envoyer du courrier (par exemple, 'mail.a.com' ou 'Smtp.gmail.com').",
            Port_25_is_default:
                " Le port 25 est le port par défaut. Pour les connexions sécurisées, le port 465 est généralement utilisé avec SSL, le port 587 est généralement utilisé avec TLS, spécifiez le protocole de sécurité ci-dessous si nécessaire.",
            If_SMTP_server_requires:
                " Si le serveur SMTP nécessite une connexion sécurisée, spécifiez le type de protocole approprié.",
            This_sets_the_authentication:
                " Ceci définit le type d'authentification à utiliser sur le serveur smtp. Actuellement, seule la connexion est prise en charge.",
            username_and_password:
                "Le serveur SMTP requiert une authentification, entrez le nom d'utilisateur et le mot de passe ici.",
            Update: " Mise à jour ",
            Test_Configuration: " Test de configuration ",
            Mail_Send: " Envoyer un mail ",
            Message_to: " Message à",
            Subject: " Matière ",
            Email_Content: "Contenu de l'e-mail ",
            Send: " Envoyer ",
            None: " Aucun ",
            SSL: "SSL",
            TLS: "TLS",
            The_length_should_between:
                " La longueur devrait être comprise entre 1 et 100.",
            SMTP_username_is_required: " Nom d'utilisateur SMTP requis ",
            SMTP_password_is_required: " Le mot de passe SMTP est requis ",
            Message_to_is_required: " Message à est requis ",
            Subject_is_required: " Le sujet est requis ",
            Content_is_required: " Le contenu est requis ",
            mechanism_is_required: " mécanisme est nécessaire ",
            admin_account: "Voulez-vous supprimer ce compte administrateur?",
            Delete: " Supprimer ",
            Cancel: " Annuler ",
            Delete_succeeded: " Supprimer réussi！",
            Updated_successfully: " Mis à jour avec succés!",
            Update_failed: " Mise à jour a échoué!",
            SMTP_Service_Setup_Successful:
                " Installation du service SMTP réussie!",
            SMTP_service_setup_failed_please_reset:
                " La configuration du service SMTP a échoué, veuillez réinitialiser!",
            Sent_successfully: " Bien envoyé!",
            Send_failed: " Echec de l'envoi!"
        },

        LIVE: {
            Live: " Live ",
            lives: " Lives ",
            search: "Chercher",
            notStarted: " Non démarré",
            inProgress: "En cours ",
            Finished: "Fini",
            All: "Tout",
            viewMyLives: "Voir mes en direct seulement",
            Title: "Titre",
            title_required: " Le titre est obligatoire ",
            title_len_limit:
                " La longueur est d" + " ' " + "entre 1 et 200 caractères ",
            post_to: "Poste à",
            section_required: " Une section est obligatoiree",
            startTime_required:
                " L" + " ' " + "heure de début est obligatoiree ",
            startTime: " L" + " ' " + "heure de début ",
            Instructor: " Instructeur ",
            instructor_required: " L" + " ' " + "Instructeur est obligatoire ",
            Cancel: "Supprimer",
            Save: "Sauvegarder",
            add_live_success: " Ajouter live avec succès ",
            edit_live_success: " Modifier live avec succès ",
            del_live_success: " Supprimer live avec succès ",
            confirm_delete: " Confirmer la suppression ",
            join_live_success: "Se joindre au live avec succès ",
            users: " utilisateurs ",
            All_Sections: " TOUTES les sections ",
            section: " section ",
            Introduction: " Introduction ",
            No_content: " Pas content ……",
            Participants: " Participants ",
            List_User_joined:
                " La liste des utilisateurs ayant rejoint le live ",
            Number_participant: " Nombre de participants ",
            Name: "Nom",
            Login_ID: " Identifiant de connexion ",
            Joined_time: " Temps joint ",
            Length_time: " Durée de la montre ",
            Not_joined: " pas rejoint ",
            joined: " rejoint ",
            Revie_times: " Temps de révision ",
            Playback: " Lecture ",
            Join_live: " Rejoignez le live ",
            View_live: " Voir le live ",
            Not_started: " Pas commencé, veuillez patienter ",
            Sure_del_live:
                " Vous êtes sur le point de supprimer ce live. Êtes-vous sûr ?",
            Live_title: " Titre live ",
            no_data: " Temporairement pas de données ",
            Join: " Joindre ",
            View: " Vue ",
            Pls_wait: " Attendez s'il vous plait. ",
            No_lives: " Il n'y a pas de vies à montrer dans cette section .",
            Add_live: " Cliquez ici pour ajouter un live "
        },
        Profile: {
            Edit_profile: " Editer le profil ",
            Biograply: " la biographie ",
            Links: "Liens",
            Pls_enter_link_title: " S'il vous plaît entrez le titre du lien ",
            Pls_enter_correct_link: " S'il vous plaît entrez le bon lien ",
            Pls_enter_display_name:
                " S'il vous plaît entrez votre nom d'affichage ",
            Length_1_and_100: " La longueur doit être comprise entre 1 et 100",
            Length_1_and_30: " La longueur doit être comprise entre 1 et 30",
            Pls_enter_active_name:
                " S'il vous plaît entrez le nom de l'activité",
            Length_1_and_20: " La longueur doit être comprise entre 1 et 20",
            Image_formate_jpg: " Le format d'image doit être jpeg / png!",
            Image_size_2M: " La taille de l'image ne doit pas dépasser 2 Mo!"
        },
        SETTINGS: {
            Old_password: " Ancien mot de passe ",
            New_password: " Nouveau mot de passe ",
            Confrim_new_paswd: " Confirmer le nouveau mot de passe ",
            Email_address: " Adresse e-mail ",
            Del_email_really: " Supprimer cet email vraiment?",
            Del_confirm: " Supprimer confirmer ",
            Image_formate_jpg: " Le format d'image doit être jpeg / png!",
            Image_size_2M: " La taille de l'image ne doit pas dépasser 2 Mo!"
        },
        RESOURCE: {
            To_Public: " Au public ",
            Within_institute: " Au sein de mon institut ",
            by: "par",
            Shared_resource: " Ressources partagées ",
            Resource: " Ressource ",
            Assignments: " Missions ",
            points: "points",
            Submitting: " Soumission ",
            On_line: "en ligne",
            On_paper: " Sur papier ",
            External_tool: " Outil externe ",
            No_submit: " Non soumettre ",
            Point: "Point",
            Questions: "Questions",
            Question: "Question",
            Max_attemps: " Max tentatives ",
            Diplay_grade: " Afficher la note en tant que ",
            percentage: " pourcentage ",
            Complete_Incomplete: " Complet / incomplet ",
            Letter_Grade: " Classement par lettre ",
            Not_Graded: " Non coté",
            File_upload: " Téléchargement de fichiers ",
            Media_recording: " Enregistrement multimédia ",
            Text_input: " Saisie de texte ",
            Website_URL: " URL de site web ",
            Minute_limited: " minute limitée ",
            Require_access_code: " Demander un code d'accès ",
            Multiple_Choice: " Choix multiple ",
            Mulitple_Answers: " Réponses multiples ",
            True_false: " VRAI / FAUX ",
            Essay: " Essai ",
            Practice_quiz: " Quiz pratique ",
            Graded_quiz: " Quiz classé",
            Graded_survey: " Enquête graduée ",
            Ungraded_survey: " Enquête non classée ",
            Import_resource: "Ressource d'importation ",
            Back: " Retour ",
            Latest_version: " Dernière version ",
            Update_follwing_course: " Mis à jour dans les cours suivants ",
            Duplicate_followinf_course: " Dupliqué aux cours suivants ",
            Select_courses: " Sélectionnez des cours ",
            Selct_course_import:
                " Veuillez sélectionner au moins un cours à importer.",
            Course: "Cours",
            Import_success: " Succès d'importation ",
            Import_failed: "Échec de l'importation ",
            Add_Favorites: " Ajouter aux Favoris ",
            Duplicate_Update: " Dupliquer / Mettre à jour ",
            Author: " Auteur ",
            Institute: " Institut ",
            Grades_Level: " Grades / Niveau ",
            Tags: " Mots clés ",
            Share_domain: " Domaine partagé",
            Updated: " Mis à jour ",
            No_version_info: " Aucune information de version ",
            Remove_Confirmation: " Supprimer la confirmation ",
            Sure_remove_resource:
                "Voulez-vous supprimer la ressource partagée?",
            Ignore_success: " Ignorer le succès ",
            Edit_resource: " Modifier la ressource ",
            Selct_licence_copyright:
                " Sélectionnez une licence pour protéger vos droits d'auteur ",
            Share_range: " Gamme de partage ",
            Only_me: " Seulement moi ",
            Share_institue:
                " Institut (partage avec les personnes du même institut avec moi)",
            Share_users_system:
                " Public (partage avec tous les utilisateurs de ce système)",
            Version_change:
                " Version (une description simple des modifications de cette version)",
            Update_change: " Télécharger / Modifier ",
            Grade_level: " Niveau scolaire ",
            From: "De",
            Pls_select: " S'il vous plait sélectionnez en un ",
            Licence_required: " Licence requise ",
            length_exceed_200: " La longueur ne peut pas dépasser 200",
            Description_required: " La description est obligatoire ",
            length_exceed_1000: " La longueur ne peut pas dépasser 1000",
            Version_note_required: " La note de version est obligatoire ",
            Should_less_5M: " Devrait être moins de 5M ",
            Image_required: " L'image est requise ",
            Edit_success: " Modifier le succès ",
            Edit_fialed: " Echec de l'édition ",
            Filter: " Filtre ",
            to: "à",
            Sequencing: " Séquençage ",
            Latest_updates: " Dernières mises à jour ",
            Most_duplicate: " Le plus souvent dupliqué",
            Duplicated: " Dupliqué",
            Favorites: " Favoris ",
            Duplicate_status: " Statut de duplication ",
            Duplicate_to: " Dupliqué à",
            Date_Time: " Date et heure ",
            Done: " Terminé",
            Failed: "Échoué",
            Share_status: " Statut de partage ",
            Category: " Catégorie ",
            Share_to: " Partager à",
            Revise_by_admin: " Révisé par Admin ",
            resourceName: " nom de la ressource ",
            Admin: " Admin ",
            Update_resource:
                " Ceci est une mise à jour d'une ressource précédemment partagée ",
            Select_resource:
                " Sélectionnez une ressource que vous devez mettre à jour ",
            Current_version: " Version actuelle ",
            Version_notes: " Notes de version ",
            Descrip_version:
                "(une description simple sur les changements de cette version)",
            Version_required: " La note de version est obligatoire ",
            Upload_change: " Télécharger / Modifier "
        },
        CALENDAR: {
            EventDetail: " EventDetail ",
            from: "de",
            to: "à",
            day: "jour",
            week: "semaine",
            month: "mois",
            Count: " Compter ",
            Todo: "à faire",
            Sure_del_todo: "Voulez-vous supprimer cette tâche?",
            Unlock_at: " Déverrouiller à",
            Discuss: " Discuter ",
            Sure_del_discuss: " Voulez-vous supprimer cette discussion?",
            Sure_del_quiz: " Voulez-vous supprimer ce quiz?",
            groupId_required: " AssignmentGroupId est requis ",
            Today: "Aujourd’hui",
            Week: "Semaine",
            Month: "Mois",
            Agenda: "Agenda",
            Date_required: " La date est requise ",
            Item_named: " Un article nommé",
            Exits_text:
                " existe déjà à cet endroit. Voulez-vous remplacer le fichier existant?",
            Change_name: " Changer de nom ",
            Replace: " Remplacer ",
            Change: " Changement ",
            name: "nom",
            Upload_timeout: " Délai de téléchargement ",
            File_cannot_empty: " Le nom du fichier ne peut pas être vide ",
            FileName_nolonger_200:
                " Le nom du fichier ne peut pas dépasser 200",
            File_exceeds: " La taille du fichier dépasse le quota!",
            FileName_repeat: " Nom de fichier répété",
            Folder_name: " Nom de dossier "
        },
        HomeCourse: {
            Student_teaching_materia:
                " Notez que vous pouvez visualiser le cours en tant qu'identité de l'étudiant et télécharger son matériel pédagogique associé (s'il est autorisé par le créateur du cours) après l'avoir importé. ",
            Import_now: " Importer maintenant ",
            Import_succedd:
                " Import réussi! Veuillez basculer sur l'identité de l'étudiant pour l'afficher ou le télécharger!",
            Create_course_now: " Créer des cours maintenant ",
            Grade: " Qualité",
            Avai: " Avai ",
            pts: "pts"
        },
        LOGIN: {
            Email_userName: " E-mail ou nom d'utilisateur ",
            Length_6_and_50: " Longueur doit être comprise entre 6 et 50",
            Only_number_letters: " N'être que des chiffres ou des lettres ",
            Enter_username: " S'il vous plaît entrez votre nom d'utilisateur ",
            Length_1_50: " La longueur doit être comprise entre 1 et 50",
            Stay_connect: " Restez connecté, continuez à apprendre ",
            Serve_connect:
                " WeLMS vise à servir les apprenants connectés à grande échelle pour effectuer une gestion centralisée efficace en termes de temps mais aussi un style d'apprentissage personnalisé. L'agilité de la plate-forme est capable de se transformer rapidement et de s'adapter à un état numériquement mûr à partir des approches traditionnelles.",
            Comprehensive_Insights:
                " Analyse complète des données pour Insights ",
            Translate_info:
                " Les données, bien sûr, doivent être traduites en informations. L'information doit alors devenir une connaissance exploitable. Sur la base des données générées par les utilisations quotidiennes, des tableaux de bord visuels et des rapports facilement compréhensibles et faciles d’accès sont essentiels pour permettre aux instructeurs d’agir de manière efficace et en temps utile sur les informations.",
            Easy_flexible: " Facile et flexible ",
            Fine_grained:
                " L'éditeur de contenu à grain fin permet à l'utilisateur de composer du matériel de formation dans un style vraiment polyvalent mais simple. L’instructeur ou l’apprenant peut organiser ses propres activités de formation / apprentissage avec une fonction de planification flexible permettant de réaliser diverses scènes d’apprentissage.",
            Privacy_policy:
                " Politique de confidentialité | Conditions d'utilisation ",
            Copy_right: "Copyright©2019   wdcloud",
            Right_reserved: " Tous les droits sont réservés "
        },
        GRADE: {
            DueTime: " Due Time ",
            SubmitTime: " SubmitTime ",
            MissionGroup: " MissionGroup ",
            Submission_status: "État de la soumission ",
            Display_Grade: " Grade affiché",
            Score_mission: " Score pour mission unique ",
            A_B_score: " A / B, A est vos scores, B est le complet ",
            Score_of_mission: " les scores de la mission ",
            Score_mission_group: " Scores pour groupe de mission ",
            A_Sum_Score: " A / B, A est la somme de vos scores, B est ",
            Sum_mission_group:
                " la somme des scores complets des missions du groupe de missions ",
            Count_final_score:
                " Le score des missions ne compte pas dans les scores finaux ",
            by_percent: " en pourcentage "
        },
        Messages: {
            Write_a_New_Message: "Écrire un nouveau message ",
            Forward_a_Message: " Transférer un message ",
            Reply_a_Message: " Répondre à un message ",
            course: "Cours",
            Message_to: " Message à",
            Send_an_individual_message_to_each_recipient:
                " Envoyer un message individuel à chaque destinataire ",
            Subject: " Assujettir ",
            Select_a_Course: " Sélectionnez un cours ",
            more_messages_will_be_sent_but_undisplayed_here:
                " plus de messages seront envoyés mais non affichés ici ",
            Cancel: " Annuler ",
            Send: " Envoyer ",
            Course_scop_is_required: " La portée du cours est requise ",
            Recievers_is_required: " Les récepteurs sont requis ",
            Subject_is_required: " Le sujet est requis ",
            Message_sending_successfull: " Message envoyé avec succès!",
            All_course: " Tous les cours ",
            Filter_by_subject: " Filtrer par sujet ",
            unstar: " unstar ",
            star: "étoile ",
            read: "lire",
            unread: " non lu ",
            Delete: " Supprimer ",
            Reply: " Répondre ",
            Reply_All: " Répondre à tous ",
            Forward: " Vers l'avant",
            more: " plus ",
            No_records_to_be_shown_for_your_query_range:
                " Aucun enregistrement à afficher pour votre plage de requête ",
            No_matching_message_please_adjust_your_input:
                " Pas de message correspondant ， veuillez ajuster votre saisie ",
            Click_load_More: " Cliquez sur charger plus ",
            Delete_messages: " Supprimer les messages ",
            Delete_the_selected_messages_really:
                " Supprimer les messages sélectionnés vraiment?",
            Confirm: " Confirmer ",
            to: "à",
            Please_select_a_message:
                " S'il vous plaît sélectionnez un message ",
            back: " retour ",
            individually_sent: " envoyé individuellement ",
            New_Message: " Nouveau message ",
            Inbox: " Boîte de réception ",
            Stared: " Regardé",
            Sent: " Envoyé"
        },
        Certification: {
            My_Certifications: " Mes certifications ",
            Sort_by: " Trier par ",
            There_are_no_Certifications_to_show_in_this_section:
                " Aucune certification à afficher dans cette section ",
            Name_a_z: "Nom(a-z)",
            Name_z_a: "Nom(z-a)",
            Data_Updated: " Données mises à jour ",
            INTERNAL: " INTERNE ",
            External: " Externe ",
            Unenrolled_ok: " Ok non inscrit ",
            Complete: "Complète",
            Due: " Dû ",
            INTERNAL_Certification: " Certification INTERNE ",
            External_Certification: " Certification externe ",
            Certification_Expired: " Certification expirée ",
            Certification_Assigned: " Certification assignée ",
            Completion_Pending: " En cours d'achèvement ",
            Certification_Completed: " Certification terminée ",
            Unenrolled_OK: " Non inscrit OK ",
            This_is_an_internal_Certification_Please_waiting:
                " Ceci est une certification interne. Veuillez patienter  n " +
                "                            our l'approbation de l'administrateur. Contacter l'administrateur en cas de  n " +
                "                           requêtes.",
            This_is_an_internal_Certification_Your_Certificate:
                " Ceci est une certification interne. Votre certificat  n " +
                " a déjà approuvé. Contacter l'administrateur en cas de  n " +
                " requêtes.",
            The_certification_has_expired_and_you:
                " La certification a expiré et vous n'avez pas  n " +
                "obtenu la certification.",
            You_has_already_unenrolled:
                " Vous avez déjà désinscrit. Contacter l'administrateur en cas de  n " +
                "requêtes.",
            This_is_an_external_Certification_Please_upload:
                "Ceci est une certification externe. S'il vous plaît téléchargez le  n " +
                " preuve d'achèvement pour approbation. Contacter l'administrateur dans  n " +
                "cas de requêtes.",
            Uploaded_proof_of_completion: " Preuve d'achèvement téléchargée.",
            Your_external_Certificate_has_already_approved:
                " Votre certificat externe a déjà été approuvé. Vous  n " +
                " pas besoin de soumettre des documents pour vérification.",
            You_has_already_unenrolled_Contact:
                " Vous avez déjà désinscrit. Contacter l'administrateur en cas de  n " +
                "requêtes.",
            Note_Only_one_document_can_be_uploaded:
                " Remarque: Un seul document peut être téléchargé en tant que  n. " +
                "une preuve ",
            Type: "Type",
            Recurring: " Récurrent ",
            No_Recurring: " Non récurrent ",
            Validity: " Validité",
            month: "mois",
            months: "mois",
            Perpetual: " Perpétuel ",
            History_of_approval: "Histoire de l'approbation ",
            Only_records_of_successful_certification:
                " Seuls les enregistrements de certification réussie sont  n " +
                "                                affiché",
            Upload_successfully: " Télécharger avec succès ",
            File_size_exceeds_quota: " La taille du fichier dépasse le quota!",
            Add_new_Certification: " Ajouter une nouvelle certification ",
            Certification_Name: " Nom de certification ",
            type: "type",
            Validity_in_months: " Validité (en mois)",
            Days_to_complete: " Jours à compléter ",
            Certification_issuer: "Émetteur de certification ",
            Cover_Image: " Image de couverture ",
            Save: "Sauver",
            This_field_is_required: " Ce champ est requis ",
            Please_enter_a_valid_number:
                "S'il vous plait, entrez un nombre valide ",
            Please_enter_a_value_between_1_and_240:
                " Veuillez entrer une valeur entre 1 et 240",
            Please_enter_a_value_between_1_and:
                " Veuillez entrer une valeur entre 1 et ",
            The_Validity_must_not_be_blank:
                " La validité ne doit pas être vide ",
            Please_enter_a_value_between_1_and_10000:
                " Veuillez entrer une valeur entre 1 et 10000",
            Certification_created_successfully:
                " Certification créée avec succès!",
            Certification_name_is_required:
                " Le nom de certification est requis ",
            File_type_shoud_be_Jpeg_jpg_png_bmp_ppm:
                " Le type de fichier doit être Jpeg jpg png bmp ppm!",
            should_be_less_than_5M: " devrait être moins de 5M ",
            Certification: "Certification",
            Click_here_to_add_a_certification:
                " Cliquez ici pour ajouter une certification ",
            Published: " Publié",
            Unpublished: " Non publié",
            Retired: " Retraité",
            View_Certification: " Voir la certification ",
            Enroll_Learners: " Inscrire des apprenants ",
            Retire: " Se retirer ",
            Duplicate: " Dupliquer ",
            Confirm_Delete: " Confirmation de la suppression ",
            You_are_about_delete_this_Certification:
                " Vous êtes sur le point de supprimer cette certification. Cela ne peut pas être  n " +
                "                    Êtes-vous sûr?",
            Certification_published_successfully:
                " Certification publiée avec succès ",
            Certification_delete_successfully:
                " Certification supprimer avec succès ",
            Certification_duplicated_successfully:
                " Certification dupliquée avec succès.",
            Certification_retired_successfully:
                " La certification a été retirée avec succès.",
            Overview: " Vue d'ensemble ",
            Learners: " Apprenants ",
            Certification_Test: " Test de certification ",
            Certification_Description: " Description de la certification ",
            Upload_Change: " Télécharger / Modifier ",
            Choose_Image: " Choisir une image ",
            Republish: " Republier ",
            Retiring_a_Certification_makes_it_unavailable:
                "Le retrait d’une certification la rend indisponible pour les nouvelles  n " +
                "inscriptions.Les apprenants déjà inscrits continuent d'afficher  n " +
                "Voulez-vous continuer?",
            OK: "OK",
            Certification_edited_successfully:
                " Certification modifiée avec succès!",
            Enroll: " Inscrire ",
            Currently_there_are_no_learners_enrolled_for:
                " Il n'y a actuellement aucun apprenant inscrit pour  n " +
                "cette certification ",
            Click_Enroll_to_get_a_started:
                " Cliquez sur Inscription pour commencer ",
            Certified: " Agréé",
            Assigned: " Attribué",
            Expired: " Expiré",
            Unenrolled: " Non inscrit ",
            PendingApproval: " Validation en attente ",
            Download_The_Proof: " Téléchargez la preuve ",
            Mark_Complete: " Mark Complete ",
            Unenroll: " Désinscrire ",
            Reject: " Rejeter ",
            ReEnroll: " Réinscrire ",
            The_following_user:
                " Les utilisateurs suivants sont prêts à être ajoutés au cours.",
            Add_User: " Ajouter un utilisateur",
            Retiring_Certification: " Certification de retraite ",
            The_learner_has_been_registered: " L'apprenant a été enregistré",
            Add_user_successfully: " Ajouter un utilisateur avec succès ",
            Mark_completed_successfully: " Mark terminé avec succès ",
            Unenrolled_Successfully: " Désinscrit avec succès ",
            Rejected_successfully: " Rejeté avec succès ",
            ReEnrolled_successfully: " Réinscrit avec succès "
        },

        eport: {
            Biography: " la biographie ",
            Delete: " Supprimer ",
            Duplicate: " Dupliquer ",
            New_page: " Nouvelle page ",
            Cancel: " Annuler ",
            Save: " Sauver ",
            Edit: " Modifier ",
            Description: "Description",
            Select_photo: " Sélectionnez une photo ",
            Select_video: " Sélectionnez une vidéo ",
            Page_title: " Titre de la page ",
            HTML_content: " HTML / Contenu incorporé",
            Paragraph_name: " Nom du paragraphe ",
            Add: " Ajouter ",
            Add_photo: " Ajouter une photo ",
            Add_video: " Ajouter une vidéo ",
            Add_file: " Ajouter un fichier ",
            Upload: " Télécharger ",
            Sure_delete_page: "Voulez-vous supprimer cette page?",
            No: "Non",
            Yes: "Oui",
            Del_page: " Supprimer la page ",
            Rename_page_name: " Renommez le nom de la page ",
            Rename: "Renommer",
            Duplicate_page: " Dupliquer la page ",
            Name_required: " Le nom est requis ",
            File_type_jpg:
                " Le type de fichier doit être Jpeg jpg png bmp ppm!",
            Photo_less_5: " La photo devrait être moins de 5M ",
            File_type_mp4: " Le type de fichier doit être MP4!",
            Photo_less_400: " La photo doit faire moins de 400M ",
            Page_name_empty: " Le nom de la page ne peut pas être vide ",
            Duplicate_page_success: " Dupliquer le succès de la page ",
            Create_eport: " Créer un ePortfolio ",
            page: "page",
            pages: "pages",
            Last_updated: " dernière mise à jour ",
            Create_new_eport: " Créer un nouveau ePortfolio ",
            Name: "Nom",
            Delete_ePortfolio: " Supprimer le ePortfolio ",
            Sure_del_ePortfolio:
                "Voulez-vous supprimer ce portfolio électronique?",
            Add_ePortfolio_success: " Ajouter le succès de l'ePortfolio ",
            Del_ePortfolio_success: " Supprimer le succès de l'ePortfolio ",
            New_page_collection: " Nouvelle collection de pages ",
            Create_new_collection: " Créer une nouvelle collection ",
            Rename_this_collection: " Renommez cette collection ",
            Sure_del_collection:
                "Voulez-vous supprimer cette collection de pages ",
            URL: "URL",
            Copy: " Copie ",
            Url_required: " L'URL est obligatoire ",
            Copy_success: " Succès de la copie ",
            Copy_failed: "Échec de la copie ",
            Duplicate_collection_success:
                " Dupliquer le succès de la collection ",
            Duplicate_collection_failed: " Dupliquer la collection a échoué",
            Del_collection_success: " Supprimer le succès de la collecte ",
            Add_collection_success: " Ajouter le succès de la collection ",
            Move_sucess: " Succès déplacé"
        }
    },
    ...frLocale
};
export default fr;
