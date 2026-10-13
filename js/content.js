// Fuente principal de mensajes y preferencias. Personaliza aquí, sin editar index.html.
// El nombre de la destinataria puede añadirse al título o a los mensajes; no se presupone.
// Fuente principal. Tras editar, ejecuta `node scripts/sync-content.js` para
// actualizar el respaldo HTML. Con JavaScript activo, esta configuración prevalece.
window.pageContent = {
  site: { title: 'Un pequeño espacio para ti', brand: 'Un pequeño espacio', brandTail: 'para ti', description: 'Un pequeño espacio para agradecer, compartir y conocernos sin prisas.' },
  navigation: { skip: 'Saltar al contenido', menu: 'Menú', label: 'Navegación principal', thanks: 'Gracias', about: 'Sobre mí', discover: 'Sobre ti', letter: 'La carta', back: 'Volver al inicio ↑' },
  labels: {
    heroEyebrow: 'UN DETALLE, A MI MANERA', start: 'Comenzar', quiet: 'Sin prisas. Puedes quedarte un momento.', scene: 'Un pequeño gesto. Un espacio para conocernos.', heroBottom: 'HECHO CON CALMA, PARA COMPARTIR', below: 'Un poquito más abajo ↓',
    thanksEyebrow: '01 / LO PRIMERO', gift: 'Hay detalles que se quedan.', giftPending: 'Un mensaje para leer con calma',
    aboutEyebrow: '02 / SIN ADORNAR DEMASIADO', aboutTitle: 'Un poco sobre mí', aboutIntro: 'No tengo todas las palabras. Pero puedo empezar por ser honesto.', aboutFootnote: 'Son cosas que reconozco en mí. Mejorar mi forma de expresarme es responsabilidad mía.',
    discoverEyebrow: '03 / AHORA, SOBRE TI', discoverTitle: 'También me gustaría conocerte a ti', conversationTitle: 'Elige una conversación', discoverFootnote: 'Responde solo lo que te apetezca. Tus respuestas permanecen en esta página hasta que decidas compartirlas; no se guardan al salir.',
    detailsEyebrow: '04 / ENTRE LÍNEAS', detailsTitle: 'Mis gustos', detailsIntro: 'Pequeños temas para seguir conversando. Puedes abrir el que te dé curiosidad.',
    letterEyebrow: '05 / PARA TERMINAR', letterTitle: 'Una pequeña carta', letterIntro: 'Unas palabras que quería compartir contigo.', letterLabel: 'PARA TI, CON SINCERIDAD', signoff: 'A mi manera.', footer: 'Gracias por pasar por aquí.',
    placeholder: 'UN LUGAR PARA MI OTRA VERSIÓN', illustrationPending: 'Ilustración pendiente', imageAlt: 'Personaje chibi masculino, de cabello oscuro semilargo y ondulado, con ropa oscura y expresión tranquila', noscript: 'Puedes leer todo el contenido y recorrer las secciones sin JavaScript.'
  },
  illustrationsEnabled: true,
  hero: {
    title: 'Hola… hice esto especialmente para ti',
    text: 'No suelo hacer este tipo de cosas. Pero como me dedico a la informática y al diseño, pensé que esta sería mi manera de expresarme. Me costó varias noches de desvelo, pero quería hacer algo diferente para agradecerte, contarte un poco sobre mí y también conocerte mejor'
  },
  thanks: {
    title: 'Gracias por tus detalles',
    text: 'Hay pequeños momentos que recuerdo con una sonrisa. Dentro de este regalo quise reunir los detalles que me sorprendieron y lo que entonces no supe decir.'
  },
  memories: [
    ['MOMENTO 1 — UNA MAÑANA INESPERADA', 'Una mañana apareciste de repente y me entregaste una salteña. Debo admitir que me sorprendiste bastante. No sabía muy bien cómo reaccionar y me quedé pensando quién eras y por qué te habías acercado', 'saltena'],
    ['MOMENTO 2 — UNA PRESENTACIÓN DIFERENTE', 'Otro día volviste a sorprenderme, esta vez con un refresco y una galleta que llevaban tu nombre. Me pareció una forma bastante particular de presentarte, y fue uno de esos detalles que no esperaba', 'refreshment'],
    ['MOMENTO 3 — LO QUE NO SUPE DECIR', 'No estoy acostumbrado a recibir este tipo de atenciones. Puede que no lo haya demostrado demasiado, pero me alegraron sinceramente. Por eso quería agradecerte a mi manera, creando algo que pudiera expresar lo que en aquel momento no supe decir', 'cookie']
  ],
  about: [
    ['Mi forma de ser', 'Soy un hombre reservado. A veces puedo parecer frío o distante; me toma un poco de tiempo encontrar las palabras.'],
    ['A mi manera', 'No suelo ser muy detallista. Crear algo visual es una forma en la que puedo expresar lo que quiero compartir.'],
    ['Conversar, paso a paso', 'A veces me cuesta iniciar o mantener una conversación. Intento mejorar mi forma de comunicarme, con calma y sinceridad.'],
    ['Mi espacio', 'Me acostumbré a estar solo y disfruto de mi espacio. Los momentos tranquilos me permiten ir a mi propio ritmo.'],
    ['Lo que valoro', 'Valoro la sinceridad, el respeto y la tranquilidad.'],
    ['Mi lado creativo', 'Trabajo con diseño gráfico y me gusta transformar ideas en cosas visuales y concretas. También me interesan la tecnología y el desarrollo de sistemas; me involucro bastante cuando algo despierta mi curiosidad.']
  ],
  discover: { text: 'No quería que este espacio tratara solamente de mí. Aunque ya hemos comenzado a conversar, siento que todavía hay muchas cosas que podemos descubrir el uno del otro. Me gustaría saber qué disfrutas, qué te inspira y qué pequeñas cosas te hacen sonreír' },
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
  details: [
    ['Música', 'Una canción puede abrir una conversación y contar algo de quien la comparte. Podemos ir descubriendo esos sonidos poco a poco.'],
    ['Creatividad y diseño', 'Me gusta crear cosas visuales y transformar una idea en algo concreto. El diseño gráfico forma parte de mi trabajo y de mi manera de expresarme.'],
    ['Tecnología', 'Me interesan la tecnología y el desarrollo de sistemas. Disfruto involucrarme en una idea y explorar cómo hacerla funcionar.'],
    ['Momentos tranquilos', 'Disfruto de mi espacio y de ir a mi ritmo. La tranquilidad también deja lugar para pensar, crear y conversar con calma.'],
    ['Curiosidades', 'Cuando algo despierta mi curiosidad, suelo involucrarme bastante. Una pregunta sencilla puede ser el comienzo de algo interesante.'],
    ['Metas y proyectos', 'Me gusta transformar ideas en cosas concretas y seguir mejorando mi forma de comunicarme. Los proyectos específicos podemos ir compartiéndolos al conversar.']
  ],
  letter: [
    'No siempre encuentro las palabras adecuadas, y probablemente ya hayas notado que a veces me cuesta mantener una conversación.',
    'Soy alguien bastante reservado. Me acostumbré tanto a mi propio espacio que, en ocasiones, no sé muy bien cómo actuar cuando alguien nuevo aparece en mi vida.',
    'Todavía recuerdo aquella mañana en la que me sorprendiste con una salteña. También recuerdo el refresco y la galleta con los que te presentaste de una manera tan particular.',
    'No supe expresar muy bien mi sorpresa en ese momento, pero me alegraron esos detalles.',
    'Quizás por eso decidí hacer esta página. No soy especialmente detallista, pero crear cosas es una de las maneras en las que mejor puedo expresarme.',
    'Y aunque ya hemos comenzado a conversar, siento que todavía hay muchas cosas que desconozco de ti, así como seguramente hay muchas que aún no conoces de mí.',
    'Me gustaría que nuestras conversaciones fueran cada vez más naturales, que podamos compartir curiosidades, reírnos de pequeñas tonterías y descubrir qué cosas tenemos en común, sin necesidad de apresurar nada.',
    'Gracias por acercarte, por tus detalles y por darme la oportunidad de comenzar a conocerte.',
    'Espero que este pequeño espacio también te permita descubrir un poco más de mí'
  ],
  // Añade los archivos cuando estén disponibles; hasta entonces se muestra el marcador.
  poses: { inicio: 'assets/chibi/chibi-nuevo.webp', gracias: 'assets/chibi/chibi-gracias.webp', pensativo: 'assets/chibi/chibi-pensativo.webp', relajado: 'assets/chibi/chibi-inicio.webp', atento: 'assets/chibi/chibi-sonrisa.webp', sonrisa: 'assets/chibi/chibi-sonrisa.webp' },
  artStates: {
    'gift-art': { closed: 'assets/images/gift-closed.webp', open: 'assets/images/gift-open.webp' },
    'letter-art': { closed: 'assets/images/letter-closed.webp', open: 'assets/images/letter-open.webp' }
  },
  starThoughts: [
    'A veces se me da mejor programar que encontrar las palabras',
    'No suelo hacer detalles así, pero quise intentarlo',
    'Esta página me costó varias noches de desvelo',
    'Todavía me causa gracia recordar aquella salteña',
    'Gracias por tomarte el tiempo de llegar hasta aquí'
  ],
  whatsappNumber: '59169597889', // Código de país y número, solo dígitos, sin + ni espacios.
  interactions: {
    giftOpen: 'Abrir mensaje', giftClose: 'Cerrar mensaje', letterOpen: 'Abrir carta', letterClose: 'Cerrar carta',
    answer: 'Mi respuesta (opcional)', answerPlaceholder: 'Puedes escribir aquí, si te apetece…',
    preferConversation: 'Prefiero contártelo conversando', conversationStatus: 'Está bien. Algunas conversaciones son mejores cuando aparecen naturalmente',
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
    imageAlts: { inicio: 'Personaje reservado de cabello oscuro con una pequeña sonrisa natural', gracias: 'Personaje sonriente sosteniendo un regalo', pensativo: 'Personaje de cabello oscuro, sentado y pensativo', relajado: 'Personaje relajado con taza y auriculares', atento: 'Personaje con una sonrisa natural sosteniendo un sobre', sonrisa: 'Personaje sonriente sosteniendo un sobre sin corazón' }
  }
};
