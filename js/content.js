// Fuente principal de mensajes y preferencias. Personaliza aquí, sin editar index.html.
// El nombre de la destinataria puede añadirse al título o a los mensajes; no se presupone.
// Fuente principal. Tras editar, ejecuta `node scripts/sync-content.js` para
// actualizar el respaldo HTML. Con JavaScript activo, esta configuración prevalece.
window.pageContent = {
  site: { title: 'Un pequeño espacio para ti', brand: 'Un pequeño espacio', brandTail: "para ti con mucho cariño", description: "Un pequeño espacio para agradecer." },
  navigation: { skip: 'Saltar al contenido', menu: 'Menú', label: 'Navegación principal', thanks: 'Gracias', about: 'Sobre mí', discover: 'Sobre ti', letter: 'La carta', back: 'Volver al inicio ↑' },
  labels: {
    heroEyebrow: 'UN DETALLE, A MI MANERA', start: 'Comenzar', quiet: "Sin prisas, puedes quedarte un momento.", scene: "Un pequeño gesto.", heroBottom: "HECHO CON MUCHO CARIÑO", below: 'Un poquito más abajo ↓',
    thanksEyebrow: "LA VIDA ESTÁ LLENA DE SORPRESAS", gift: 'Hay detalles que se quedan.', giftPending: 'Un mensaje para leer con calma',
    aboutEyebrow: "AUNQUE NO ME LO PEDISTE", aboutTitle: 'Un poco sobre mí', aboutIntro: "No tengo todas las palabras, pero puedo empezar por ser honesto.", aboutFootnote: "Son cosas que reconozco en mí.",
    discoverEyebrow: "AHORA, SOBRE TI", discoverTitle: 'También me gustaría conocerte a ti', conversationTitle: "Elige una conversación.", discoverFootnote: "Responde solo lo que te apetezca, sin presiones",
    letterEyebrow: "PARA TERMINAR", letterTitle: 'Una pequeña carta', letterIntro: 'Unas palabras que quería compartir contigo.', letterLabel: 'PARA TI, CON SINCERIDAD', signoff: 'A mi manera.', footer: 'Gracias por pasar por aquí.',
    placeholder: 'UN LUGAR PARA MI OTRA VERSIÓN', illustrationPending: 'Ilustración pendiente', imageAlt: 'Personaje chibi masculino, de cabello oscuro semilargo y ondulado, con ropa oscura y expresión tranquila', noscript: 'Puedes leer todo el contenido y recorrer las secciones sin JavaScript.'
  },
  music: {
    "title": "Una canción que quería compartir contigo",
    "button": "Escuchar la canción",
    "url": "https://youtu.be/Xm_M3B5B7Lo?si=BGoWgEivllY5tBN-",
    "external": "Se abre YouTube en una pestaña nueva"
  },
  verse: {"text": "Porque de tal manera amó Dios al mundo…", "reference": "Juan 3:16"},
  starHint: "Algunas estrellas tienen algo que contarte",
  illustrationsEnabled: true,
  hero: {
    title: 'Hola… hice esto especialmente para ti',
    text: "No suelo hacer este tipo de cosas, pero como me dedico a la informática y al diseño, se me ocurrió crear algo propio. Pensé que esta podría ser mi manera de expresarme.\n\nLa verdad, me costó varias noches de desvelo, principalmente porque no sabía cómo empezar, jajaja. Aun así, quería hacer algo diferente para agradecerte, contarte un poco sobre mí y, si me das el privilegio, también conocerte mejor."
  },
  thanks: {
    title: 'Gracias por tus detalles',
    text: "Hay pequeños momentos que me sorprendieron y que todavía recuerdo con una sonrisa. Dentro de este regalo quise reunir algunas cosas que en aquel momento no supe decir."
  },
  memories: [
    [
      "Recuerdo 1 — Una mañana inesperada",
      "Una mañana apareciste de repente y me entregaste una salteña. Me quedé anonadado, la verdad, jajaja. No sabía muy bien cómo reaccionar y pasé buena parte del día preguntándome quién sería aquella señorita y por qué se había acercado a mí.",
      "saltena"
    ],
    [
      "Recuerdo 2 — Una presentación diferente",
      "Otro día volviste a sorprenderme, esta vez con un refresco y una galletita que llevaban tu nombre en sus etiquetas.\n\nMe pareció una forma bastante particular y creativa de presentarte. Pero la sorpresa no terminó ahí: entre aquellos detalles había un código QR que me llevó a una canción.\n\nCuando finalmente comprendí lo que estaba pasando, me quedé sonrojado y sin saber muy bien qué pensar, jajaja. Aquella canción consiguió tranquilizarme un poco entre tantas preguntas y emociones.",
      "refreshment"
    ],
    [
      "Recuerdo 3 — Lo que no supe decir",
      "No estoy acostumbrado a recibir este tipo de atenciones. Puede que no lo haya demostrado demasiado, pero me alegraron sinceramente.\n\nPor eso quería agradecerte a mi manera, creando algo que pudiera expresar lo que en aquel momento no supe decir.",
      "cookie"
    ]
  ],
  about: [
    [
      "Mi forma de ser",
      "Soy un hombre reservado. A veces puedo parecer frío o distante; me toma un poco de tiempo encontrar las palabras y otras veces simplemente me quedo en blanco."
    ],
    [
      "A mi manera",
      "No suelo ser muy detallista, pero crear algo visual es una de las maneras en las que puedo expresar lo que quiero compartir, además de las palabras."
    ],
    [
      "Conversar, paso a paso",
      "A veces me cuesta iniciar o mantener una conversación, e incluso puedo ser algo torpe con las palabras. Pero intento mejorar mi forma de comunicarme, con calma."
    ],
    [
      "Mi espacio",
      "Me acostumbré a estar solo y disfruto de mi espacio. Los momentos tranquilos me permiten ir a mi propio ritmo."
    ],
    [
      "Lo que valoro",
      "Valoro la sinceridad, el respeto y la tranquilidad."
    ],
    [
      "Mi lado creativo",
      "Trabajo con diseño gráfico y me gusta transformar ideas en cosas visuales y concretas. También suelo tocar la guitarra para componer canciones fugaces, aunque actualmente soy bajista."
    ]
  ],
  discover: { text: "No quería que este espacio tratara solamente de mí. Siento que todavía hay muchas cosas que podemos descubrir. Me gustaría saber qué disfrutas, qué te inspira y qué pequeñas cosas te hacen sonreír." },
  // [id estable, tema, pregunta abierta, invitación]. Todas las respuestas son opcionales.
  questions: [
    ['musica', 'Música y canciones especiales', '¿Qué canción tiene una historia especial para ti?', 'Si quieres, podemos empezar por una canción.'],
    ['anecdotas', 'Anécdotas inesperadas', '¿Qué sorpresa cotidiana todavía recuerdas?', 'A veces una pequeña anécdota abre una buena conversación.'],
    ['momentos', 'Momentos tranquilos', '¿Cómo disfrutas un momento de tranquilidad?', 'Me gustaría conocer ese pequeño espacio tuyo.'],
    ['curiosidades', 'Curiosidades personales', '¿Qué curiosidad sobre ti suele sorprender a los demás?', 'Puede ser algo sencillo que casi nunca cuentas.'],
    ['suenos', 'Sueños y metas', '¿Qué te gustaría hacer o aprender algún día?', 'Podemos compartir ideas, sin necesidad de tener todo resuelto.'],
    ['risas', 'Cosas que nos hacen reír', '¿Qué pequeña tontería suele hacerte reír?', 'También hay espacio para conversar de cosas ligeras.'],
    ['sobre-ti', 'Algo más sobre ti', '¿Qué te gustaría que yo supiera de ti?', 'Puedes elegir lo que quieras compartir, a tu ritmo.']
  ],
  letter: [
    "Nuevamente quiero agradecerte por los detalles. Quizás ya hayas notado que soy alguien un poco distraído y que no siempre encuentro las palabras adecuadas, pero algo que sí disfruto es escuchar a las personas.",
    "Aquella mañana en la que llegaste de repente preguntando por mí todavía resuena en mi cabeza. No te mentiré, me dejaste completamente confundido y pensativo durante todo el día.",
    "Y cuando otro día aparecieron aquel refresco y esa galletita con tu nombre, volviste a sorprenderme. Al descubrir el código QR de la etiqueta y escuchar la canción que habías compartido, terminé todavía más desconcertado, pero también bastante alegre.",
    "Aquella canción consiguió calmar un poco los nervios que sentía. Me dio tanta vergüenza que terminé dando vueltas en mi cama sin saber muy bien qué pensar, jajaja.",
    "Soy alguien bastante reservado y no estoy acostumbrado a recibir este tipo de atenciones. Por eso las valoro tanto, y quiero que sepas que significaron mucho para mí.",
    "Pensé en enviarte muchos mensajes después de aquello, pero terminé pensando demasiado en qué decir. Al final, lo único que pude hacer fue darte las gracias.",
    "Quizás por eso decidí crear esta página. Como te conté antes, no suelo ser especialmente detallista, pero crear cosas es una de las maneras en las que mejor puedo expresarme.",
    "Me gustaría que nuestras conversaciones fueran cada vez más naturales, que podamos compartir curiosidades, reírnos de pequeñas tonterías y descubrir las cosas que tenemos en común, sin necesidad de apresurar nada.",
    "Quizás, cuando leas esto, ya haya cometido mil y una tonterías, o tal vez me hayas notado bastante nervioso. Pero hay algo que quiero que sepas: te estoy muy agradecido.",
    "Gracias por acercarte, por tus detalles y, si es posible, por darme el privilegio de seguir conociéndote.",
    "Espero que este pequeño espacio sea un obsequio que represente mi gratitud."
  ],
  // Añade los archivos cuando estén disponibles; hasta entonces se muestra el marcador.
  poses: { inicio: 'assets/chibi/chibi-portada-alegre.webp', gracias: 'assets/chibi/chibi-gracias.webp', pensativo: 'assets/chibi/chibi-pensativo.webp', atento: 'assets/chibi/chibi-sonrisa.webp', sonrisa: 'assets/chibi/chibi-sonrisa.webp' },
  artStates: {
    'gift-art': { closed: 'assets/images/gift-closed.webp', open: 'assets/images/gift-open.webp' },
    'letter-art': { closed: 'assets/images/letter-closed.webp', open: 'assets/images/letter-open.webp' }
  },
  starThoughts: ["A veces se me da mejor programar que encontrar las palabras", "No suelo hacer detalles así, pero quise intentarlo", "Esta página me costó varias noches de desvelo, jajajaja", "Todavía me causa gracia recordar aquella salteña y lo confundido que estuve", "Gracias por tomarte el tiempo de llegar hasta aquí"],
  whatsappNumber: '59169597889', // Código de país y número, solo dígitos, sin + ni espacios.
  interactions: {
    giftOpen: 'Abrir mensaje', giftClose: 'Cerrar mensaje', letterOpen: 'Abrir carta', letterClose: 'Cerrar carta',
    answer: "Escríbeme", answerPlaceholder: 'Puedes escribir aquí, si te apetece…',
    preferConversation: 'Prefiero contártelo conversando', conversationStatus: "Está bien, no te preocupes. Algunas conversaciones son mejores cuando aparecen naturalmente",
    share: 'Compartir mis respuestas', previewTitle: 'Revisa tu mensaje', previewLabel: 'Mensaje editable',
    previewHelp: 'Puedes editar el texto o cancelar. No se envía nada automáticamente.',
    cancel: 'Cancelar', copy: 'Copiar respuestas', copied: 'Mensaje copiado. Puedes pegarlo donde prefieras.',
    copyFallback: 'No se pudo copiar automáticamente. Selecciona y copia el texto de la vista previa.',
    empty: 'Escribe al menos una respuesta para preparar el mensaje.',
    noNumber: 'No hay un número de WhatsApp configurado. Puedes copiar el mensaje.',
    confirm: 'Confirmo que quiero abrir WhatsApp con este texto. Yo decidiré si lo envío.',
    whatsapp: 'Abrir WhatsApp', opened: 'Se solicitó abrir WhatsApp. El envío queda en tus manos; si no se abre, puedes copiar el mensaje.',
    blocked: 'No se pudo abrir WhatsApp. Puedes copiar el mensaje.',
    confirmRequired: 'Confirma primero que deseas abrir WhatsApp.',
    messageIntro: 'Estas son algunas de mis respuestas:',
    starOpen: 'Leer un pequeño pensamiento', starClose: 'Cerrar pensamiento',
    imageAlts: { inicio: 'Personaje de cabello oscuro con una expresión alegre y una sonrisa natural', gracias: 'Personaje sonriente sosteniendo un regalo', pensativo: 'Personaje de cabello oscuro, sentado y pensativo', atento: 'Personaje con una sonrisa natural sosteniendo un sobre', sonrisa: 'Personaje sonriente sosteniendo un sobre sin corazón' }
  }
};
