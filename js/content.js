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
    discoverEyebrow: "AHORA, SOBRE TI", discoverTitle: 'Bueno… ¿y qué hay de ti?', conversationTitle: "¿De qué te gustaría conversar?", discoverFootnote: "Responde solo lo que te apetezca, sin presiones",
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
      "Todo comenzó con una visita inesperada y una salteña. Creo que mi cara de confusión lo decía todo, jajajaja. Sin darte cuenta, me dejaste con un pequeño misterio por resolver.",
      "saltena"
    ],
    [
      "Recuerdo 2 — Una sorpresa con música",
      "Después llegaron un refresco y una galletita con una presentación bastante original, y, por si fuera poco, un código QR que escondía una canción. ¡Vaya manera de sorprenderme!",
      "refreshment"
    ],
    [
      "Recuerdo 3 — Una sonrisa inesperada",
      "Hay gestos pequeños que consiguen alegrarte el día cuando menos lo esperas. Estos fueron algunos de esos momentos que vale la pena recordar.",
      "cookie"
    ]
  ],

  
  about: [
    [
      "Mi forma de ser",
      "Al principio suelo ser bastante tranquilo y reservado. Pero cuando agarro confianza, también aparece mi lado bromista y alguna que otra ideota descabellada :D."
    ],
    [
      "Mi lado creativo",
      "Me gusta transformar las ideas en algo que pueda verse, escucharse o utilizarse. Por eso disfruto tanto de la informática y del diseño gráfico."
    ],
    [
      "La música y yo",
      "La guitarra me ha acompañado durante bastante tiempo. A veces me da por componer canciones que aparecen de repente y desaparecen igual de rápido. Actualmente también toco el bajo."
    ],
    [
      "Mis momentos favoritos",
      "Disfruto de los momentos tranquilos, escuchar música, aprender algo nuevo y pasar un rato haciendo cosas que me gustan."
    ],
    [
      "Lo que valoro",
      "Me gustan las personas sinceras, las conversaciones sin apariencias y esos momentos en los que uno puede sentirse cómodo siendo como es."
    ],
    [
      "Algo curioso sobre mí",
      "Puedo pasar horas intentando resolver un problema de programación o aprendiendo algo que me interesa… aunque para elegir qué decir en una conversación a veces me tome mucho más tiempo, de lo normal."
    ]
  ],

  discover: { text: "Bueno, ya hablé bastante de mí, :D. Ahora me dio curiosidad saber un poquito más sobre ti. Preparé algunas preguntas por si alguna te llama la atención. Puedes responder una, varias o ninguna; también podemos dejar esas historias para una conversación." },
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
    "Bueno… si llegaste hasta aquí, significa que sobreviviste a todas mis ocurrencias, jajajaja.",
  
    "Antes que nada, quiero darte las gracias, sé que lo he mencionado varias veces, pero hay cosas que uno no termina de expresar con un simple -gracias-, y creo que esta es una de ellas.",
  
    "Todavía recuerdo aquella mañana en la que apareciste de repente preguntando por mí y me entregaste una salteña, no tienes idea de la cantidad de preguntas que pasaron por mi cabeza. -¿Quién será? ¿Por qué no la recuerdo? ¿De dónde me conoce?-. Creo que pasé buena parte del día intentando resolver aquel misterio, :D.",
  
    "Y cuando otro día llegaron el refresco y la galletita con tu nombre, pensé que las sorpresas habían terminado ahí, pero no… todavía estaba aquel tema en el QR.",
  
    "Cuando descubrí la canción, no sabía si sonreír, ponerme nervioso o seguir intentando entender qué estaba pasando. Al final, hice un poquito de todo, jajajaja. Curiosamente, escucharla también me ayudó a tranquilizarme.",
  
    "Quizás para ti fueron detalles sencillos, pero para mí resultaron inesperados y muy bonitos, no estoy acostumbrado a recibir ese tipo de atenciones, así que probablemente mi reacción no fue la más expresiva del mundo. Sin embargo, quiero que sepas que me alegraron muchísimo.",
  
    "Después pensé en escribirte un montón de cosas, pero cada vez que intentaba ordenar mis ideas, terminaba dándoles demasiadas vueltas.",
  
    "Y entonces se me ocurrió algo…",
  
    "-Bueno, si las palabras no me salen tan fácilmente, tal vez pueda expresarme haciendo lo que sé hacer-.",
  
    "Así nació esta página.",
  
    "Entre líneas de código, imágenes, pequeños errores que aparecían de la nada y varias noches de desvelo, fui construyendo este pequeño espacio. No voy a negar que hubo momentos en los que pensé: -¿Y ahora por qué no funciona esto?-, jajsjs.",
  
    "Pero quería hacerlo.",
  
    "No porque esperara algo a cambio, sino porque me parecía bonito agradecerte con algo creado por mí, asi como me obsequiaste algo creado por ti.",
  
    "Y también porque quería que conocieras un poquito más de mí. Espero que, después de recorrer este pequeño espacio, hayas descubierto que detrás de mi cara seria también hay alguien con ocurrencias, sueños y muchas ganas de seguir aprendiendo cosas nueva.",
  
    "Ahora que hemos comenzado a conversar, me gustaría seguir descubriendo cosas de ti: qué música te acompaña, qué te hace reír, cuáles son tus sueños o simplemente cómo estuvo tu día.",
  
    "No tenemos que descubrirlo todo de golpe. A veces las mejores conversaciones comienzan con algo tan sencillo como una pregunta inesperada… o, en nuestro caso, una salteña, :D XD.",
  
    "Quizá cuando leas esto ya haya dicho alguna tontería o me hayas notado un poco nervioso, pero espero que también hayas podido conocer una parte más alegre y sincera de mí.",
  
    "Gracias por aquellos detalles, por las sorpresas y por darme el privilegio de conocerte.",
  
    "Espero que esta página te saque al menos una sonrisa, porque mientras la preparaba, más de una vez terminé sonriendo yo también.",

    "No tienes que sentirte comprometida a responder de alguna manera especial. Con que hayas disfrutado este pequeño recorrido y te haya sacado una sonrisa, para mí ya habrá valido la pena.",
  
    "Un pequeño detalle, hecho a mi manera."
  ],
  // Añade los archivos cuando estén disponibles; hasta entonces se muestra el marcador.
  poses: { inicio: 'assets/chibi/chibi-portada-alegre.webp', gracias: 'assets/chibi/chibi-gracias.webp', pensativo: 'assets/chibi/chibi-pensativo.webp', atento: 'assets/chibi/chibi-sonrisa.webp', sonrisa: 'assets/chibi/chibi-sonrisa.webp' },
  artStates: {
    'gift-art': { closed: 'assets/images/gift-closed.webp', open: 'assets/images/gift-open.webp' },
    'letter-art': { closed: 'assets/images/letter-closed.webp', open: 'assets/images/letter-open.webp' }
  },
  starThoughts: ["Hay ideas que comienzan con un simple -¿y si lo intento?-", "Dato curioso: algunas de mis mejores ideas aparecen cuando debería estar durmiendo", "Si encuentras algún detalle curioso en esta página, probablemente tardé más de lo necesario en hacerlo, jajaja", "Me gustan esas pequeñas sorpresas que hacen diferente un día cualquiera", "¡Encontraste otra estrella! Espero que estés disfrutando este pequeño recorrido"],
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
