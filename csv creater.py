import csv

cuss_dictionary = {
    "english": {
        "words": [
            "arse", "arsehead", "arsehole", "ass", "asshole", "bastard", "bitch", "bloody", "blowjob",
            "blumpkin", "bollocks", "brotherfucker", "bugger", "bullshit", "child-fucker", "cock",
            "cocksucker", "cockwad", "crap", "cumshot", "cunt", "dammit", "damn", "damned", "dick",
            "dick-head", "dickhead", "dumb-ass", "dumbass", "dyke", "fag", "faggot", "father-fucker",
            "fatherfucker", "footjob", "fuck", "fucker", "fucking", "goddammit", "goddamn", "goddamned",
            "goddamnit", "godsdamn", "handjob", "hell", "horseshit", "jackarse", "jack-ass", "jackass",
            "kike", "mother-fucker", "motherfucker", "nigga", "nigger", "nigra", "pigfucker",
            "prostitute", "piss", "prick", "pussy", "redneck", "shit", "shite", "shithead","sisterfuck",
            "sisterfucker", "slut", "spastic", "twat", "wanker", "whore"
        ],
        "expressions": [
            "ass hole", "Christ on a bike", "Christ on a cracker", "damn it", "dumb ass", "give head",
            "go fuck yourself", "go to hell", "god damm", "god damnit", "holy shit", "in shit",
            "Jesus Christ", "Jesus fuck", "Jesus Harold Christ", "Jesus H. Christ",
            "Jesus, Mary and Joseph", "Jesus wept", "kiss my ass", "mother fucker", "shit ass",
            "sibling fucker", "son of a bitch", "son of a whore", "sweet Jesus"
        ]
    },
    "spanish": {
        "words": [
            "anormal", "bubis", "bufas", "bufarracas", "capulla", "capullo", "caraculo", "caramierda",
            "chupahuevos", "chupapijas", "chupapingas", "chupapollas", "chúpamela", "chupádmela", "chocho",
            "cipote", "cojón", "cojones", "coño", "coñazo", "culo", "domingas", "estúpida", "estúpido",
            "follar", "follada", "follado", "gilipollas", "hostia", "hostias", "huevón", "huevona",
            "imbécil", "inútil", "japuta", "joder", "jodido", "joputa", "lameculos", "lerda", "lerdo",
            "malfollada", "malfollado", "mamelungas", "mamón", "mamona", "marica", "maricón", "mierda",
            "mierdón", "orto", "ostia", "ostias", "pajera", "pajero", "pajote", "papanatas", "pelagatos",
            "pendeja", "pendejo", "pinga", "pirada", "pirado", "polla", "pollas", "pollón", "puta", "putada",
            "putadón", "puto", "putón", "pringada", "pringado", "pringao", "tetarracas", "tetazas", "tetorras",
            "teturras", "tocacojones", "tocapelotas", "tonta", "tonto", "subnormal", "verga", "zorra", "zorrón",
            "zumbada", "zumbado"
        ],
        "expressions": [
            "a tomar por culo", "chúpame la polla", "chupadme la polla", "chúpame un huevo", "cómeme los huevos",
            "comedme los huevos", "chupa pijas", "chupa pingas", "chupa pollas", "hija de perra", "hijo de perra",
            "hija de puta", "hijo de puta", "la concha de tu madre", "mal nacida", "mal nacido", "me cago en Dios",
            "me cago en la leche", "me cago en la puta", "me cago en su puta madre", "me cago en sus muertos",
            "me cago en todo lo que se menea", "me cago en tu puta madre", "me cago en tus muertos",
            "me cago en vuestros muertos", "me cago en vuestra puta madre", "me coméis los huevos",
            "me comes los huevos", "me podéis comer los huevos", "me puedes comer los huevos",
            "me puede chupar la polla", "me podéis chupar la polla", "mierda de persona", "pedazo de mierda",
            "perro flauta", "que le den", "que les den", "que os den", "que te den", "que le den por culo",
            "que les den por culo", "que os den por culo", "que te den por culo", "que te folle", "que te follen",
            "que os follen", "tonta de los cojones", "tonto de los cojones", "tonta del culo", "tonto del culo",
            "trozo de mierda", "una polla", "una polla en vinagre", "vete a la mierda", "vete a tomar por culo",
            "vete a tomar por saco", "vete a tomar viento", "vete a la verga", "la puta de tu madre",
            "la puta de su madre", "la madre que te parió", "la madre que os parió", "me cago en la Virgen",
            "me cago en la mar", "me cago en la mar salada", "me cago en Cristo", "sácate la polla de la boca",
            "me va a comer el coño", "me vas a comer el coño", "me vais a comer el coño", "me coméis el coño",
            "me va a comer todo el coño", "me vas a comer todo el coño", "me vais a comer todo el coño",
            "me puedes comer el coño", "me puede comer el coño", "me podéis comer el coño", "me come el coño",
            "me comen el coño", "cómeme el coño", "comedme el coño"
        ]
    },
    "french": {
        "words": [
            "pute", "connard", "con", "enculé", "merde", "salop", "salope", "bordel", "bite", 
            "niquer", "cul", "putain", "pédé", "clochard", "cocue", "branler", "gouine", 
            "tapette", "foutre", "taré", "bouffon", "dégueulasse", "cunt", "tarlouze",
            "enculée", "salaud", "salopard", "bâtard", "dégueu", "connasse", "moche", "sucer",
            "pédale", "gueule", "flinguer", "negre", "imbécile", "abruti", "abrutie", "bâtardise"
        ],
        "expressions": [
            "sacré merde", "fils de pute", "sale con", "gros con", "chien de merde", "va te faire foutre",
            "trou du cul", "sac à merde", "gros fdp", "connard de merde", "truc de merde",
            "bite de ta mère", "ta gueule", "ta race", "sale chien", "vieille pute",
            "sale pute", "putain de merde", "sous merde", "trou de balle"
        ]
    }
}

# Sort all lists alphabetically
for lang_data in cuss_dictionary.values():
    for key in lang_data:
        lang_data[key] = sorted(lang_data[key])

# Iterate through each language in the dictionary and write the corresponding words and expressions to CSV
for language, categories in cuss_dictionary.items():
    for category, words_list in categories.items():
        # Adjust filename format here
        filename = f"{language}_cuss_{category}.csv"
        
        print(f"Attempting to write to {filename}")  # Debugging line
        
        try:
            with open(filename, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                # Write the header with the category name
                writer.writerow([f"{language.capitalize()} Cuss {category.capitalize()}"])
                
                # Write each word/expression
                for word in words_list:
                    print(f"Writing: {word}")  # Debugging line to track what's being written
                    writer.writerow([word])
                
            print(f"{filename} created successfully.")  # Notify user if the file was created successfully
        except Exception as e:
            print(f"Error occurred while creating {filename}: {str(e)}")  # Alert user in case of an error

print("CSV files created successfully.")
