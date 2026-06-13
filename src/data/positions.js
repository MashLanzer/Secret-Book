export const CATEGORIES = {
  basicas: { label: 'Básicas', color: '#a855f7', bg: 'rgba(168,85,247,0.15)', icon: '🌸' },
  romanticas: { label: 'Románticas', color: '#ec4899', bg: 'rgba(236,72,153,0.15)', icon: '💕' },
  intermedias: { label: 'Intermedias', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)', icon: '🔥' },
  avanzadas: { label: 'Avanzadas', color: '#7c3aed', bg: 'rgba(124,58,237,0.15)', icon: '⚡' },
  divertidas: { label: 'Divertidas', color: '#d946ef', bg: 'rgba(217,70,239,0.15)', icon: '🎉' },
  creativas: { label: 'Creativas', color: '#c026d3', bg: 'rgba(192,38,211,0.15)', icon: '🎨' },
}

export const SVG_TYPES = [
  'lying_face', 'spoon', 'rider', 'kneeling', 'seated',
  'standing', 'bridge', 'lotus', 'diagonal', 'behind',
  'side_embrace', 'acrobatic'
]

// [id, nombre, descripcion, categoria, dificultad, flexibilidad, intensidad, svgType]
const raw = [
  // BÁSICAS
  [1,'El Misionero Clásico','La conexión más íntima y directa. Cara a cara, corazón con corazón. Perfecta para una noche romántica y tranquila.','basicas',1,1,2,'lying_face'],
  [2,'La Cucharita','Abrazados como dos cucharas perfectas. Intimidad sin prisa, calor y ternura en su máxima expresión.','basicas',1,1,1,'spoon'],
  [3,'La Amazona','Ella toma el control con elegancia. Ritmo, poder y mirada fija: una experiencia liberadora para ambos.','basicas',2,2,3,'rider'],
  [4,'El Perrito','Intensidad y profundidad en perfecta armonía. Clásica y siempre efectiva cuando la pasión manda.','basicas',1,2,3,'behind'],
  [5,'El Jinete Inverso','El misterio de no verse los ojos. Ella lleva el ritmo hacia atrás, creando sensaciones únicas e inesperadas.','basicas',2,2,3,'rider'],
  [6,'La Silla','Sentados frente a frente, susurros y miradas. Lenta, íntima y perfecta para cuando el tiempo no importa.','basicas',2,2,2,'seated'],
  [7,'La Mariposa','Él de pie, ella reclinada. Ángulo perfecto para explorar nuevas sensaciones con total comodidad.','basicas',2,3,3,'kneeling'],
  [8,'El Abrazo Eterno','El más tierno de todos. Cuerpos entrelazados, respiraciones sincronizadas, almas unidas.','basicas',1,1,1,'lying_face'],
  [9,'La Cucharita Frontal','Como cucharas pero de frente. Besos fáciles, caricias naturales y calor compartido en cada movimiento.','basicas',1,1,2,'lying_face'],
  [10,'El Loto','Sentados frente a frente, entrelazados como una sola figura. Meditación y pasión en perfecta fusión.','basicas',2,3,2,'lotus'],
  [11,'El Ángel','Suave como una nube. Ella recostada, él sobre ella pero apoyado, creando una sensación de ingravidez.','basicas',1,2,2,'lying_face'],
  [12,'La Media Luna','Cuerpos curvados en armonía. Una posición lateral que combina comodidad con profundidad inesperada.','basicas',2,2,2,'diagonal'],
  [13,'El Nido','Acurrucados como pájaros en su nido. Calidez absoluta y conexión emocional profunda.','basicas',1,1,1,'spoon'],
  [14,'El Puente','Ella crea un arco hermoso mientras él la sostiene. Requiere confianza y recompensa con sensaciones intensas.','basicas',3,3,3,'bridge'],
  [15,'El Columpio','Él arrodillado, ella en sus brazos. Movimiento suave y rítmico como un columpio en el atardecer.','basicas',2,2,3,'kneeling'],
  [16,'La Ola','Movimientos ondulantes y continuos. Como el mar, sin principio ni fin, solo flujo constante de placer.','basicas',2,2,2,'lying_face'],
  [17,'El Espejo','Posiciones simétricas que se reflejan. Explorar el cuerpo del otro mientras se imitan mutuamente.','basicas',1,1,2,'lying_face'],
  [18,'La Tortuga','Ella enroscada, él protector. Una posición única que desafía la norma con resultados sorprendentes.','basicas',2,3,2,'behind'],
  [19,'La Hoja','Ligeros como hojas al viento. De lado, suaves movimientos que no cansan y duran toda la noche.','basicas',1,2,2,'side_embrace'],
  [20,'El Remolino','Rotación lenta y constante que intensifica cada contacto. Como un remolino que te absorbe suavemente.','basicas',2,2,3,'diagonal'],

  // ROMÁNTICAS
  [21,'El Vals','De pie, abrazados, balanceándose al ritmo del amor. Íntimo, romántico, casi un baile.','romanticas',2,2,2,'standing'],
  [22,'El Primer Beso','Delicado como el primer beso. Sin prisa, con ternura infinita y la magia de empezar algo nuevo.','romanticas',1,1,1,'lying_face'],
  [23,'La Serenata','Él la rodea completamente mientras le susurra al oído. Música de cuerpos en perfecta sintonía.','romanticas',2,2,2,'seated'],
  [24,'El Atardecer','Abrazados viendo el mismo horizonte. La cucharita más romántica, como ver juntos el sol bajar.','romanticas',1,2,2,'spoon'],
  [25,'La Promesa','Frente a frente, manos entrelazadas, miradas que hablan. Un acto de amor y confianza absoluta.','romanticas',1,1,1,'standing'],
  [26,'La Danza','Cuerpos que se mueven como si escucharan la misma canción. Pasión con elegancia de vals.','romanticas',3,3,3,'standing'],
  [27,'El Susurro','Tan cerca que se sienten los latidos. Suave, íntimo, diseñado para los momentos más especiales.','romanticas',1,1,1,'spoon'],
  [28,'La Poesía','Cada movimiento es un verso. Lenta y expresiva, como escribir una historia juntos con el cuerpo.','romanticas',2,2,2,'lying_face'],
  [29,'El Destino','Encajando perfectamente como si fueran hechos el uno para el otro. Profunda y llena de significado.','romanticas',2,2,3,'rider'],
  [30,'La Eternidad','Posición que parece no tener fin. Conexión tan profunda que el tiempo se detiene a su alrededor.','romanticas',2,3,2,'lotus'],
  [31,'El Paraíso','Ella reclinada entre sus piernas, él la abraza desde atrás. El paraíso existe y huele a su perfume.','romanticas',2,2,3,'kneeling'],
  [32,'La Sinfonía','Movimientos coordinados como instrumentos en una orquesta. Juntos crean algo más grande que las partes.','romanticas',3,3,3,'diagonal'],
  [33,'El Lirio','Delicada como una flor. Suave apertura que descubre sensaciones nunca antes exploradas juntos.','romanticas',2,2,2,'lying_face'],
  [34,'La Aurora','El amanecer en cada caricia. Lenta, luminosa, perfecta para empezar el día de la manera correcta.','romanticas',1,2,2,'spoon'],
  [35,'El Éxtasis Suave','Intensidad sin brusquedad. La versión romántica del éxtasis: profunda pero llena de ternura.','romanticas',2,3,3,'lotus'],
  [36,'La Melodía','Como una melodía que no quieres que termine. Ritmo perfecto, harmonía total, final memorable.','romanticas',2,2,2,'side_embrace'],
  [37,'El Corazón','Cuerpos que forman la silueta de un corazón. Simbólica, tierna e increíblemente íntima.','romanticas',2,3,2,'seated'],
  [38,'La Caricia','Todo es caricia, todo es tacto. Exploración lenta de cada centímetro con adoración total.','romanticas',1,1,1,'lying_face'],
  [39,'El Sueño','Tan relajada que parece un sueño. Perfecta cuando el amor se mezcla con la pereza del domingo.','romanticas',1,1,2,'spoon'],
  [40,'La Luna Llena','Ella brilla como la luna llena. Posición que la pone en el centro del universo de él.','romanticas',3,3,3,'rider'],

  // INTERMEDIAS
  [41,'El Triángulo','Geometría del placer. Ángulos precisos que maximizan el contacto y la profundidad simultáneamente.','intermedias',3,3,3,'diagonal'],
  [42,'La Serpiente','Sinuosa y flexible. Ella se ondula mientras él la sigue, creando una danza de serpientes en sincronía.','intermedias',3,4,3,'behind'],
  [43,'El Arco','Tensión y liberación. Como un arco a punto de disparar, la posición acumula energía para liberarla toda.','intermedias',3,4,4,'bridge'],
  [44,'El Torbellino','Movimiento giratorio que intensifica cada segundo. Difícil de controlar, imposible de olvidar.','intermedias',3,3,4,'rider'],
  [45,'La Palanca','Él usa su cuerpo como palanca para maximizar el ángulo y la profundidad. Física al servicio del placer.','intermedias',3,3,3,'kneeling'],
  [46,'El Zigzag','Movimientos en zigzag que sorprenden en cada cambio de dirección. Nunca predecible, siempre excitante.','intermedias',3,3,3,'diagonal'],
  [47,'La Hebilla','Piernas entrelazadas como hebillas. Cerrojo perfecto que maximiza el contacto de cuerpos.','intermedias',3,4,3,'lying_face'],
  [48,'El Nudo','Tan entrelazados que es difícil saber dónde termina uno y empieza el otro. Fusión total de cuerpos.','intermedias',4,4,4,'acrobatic'],
  [49,'La Cruz','Ángulo de 90 grados que ofrece profundidad desde una perspectiva completamente nueva.','intermedias',3,3,3,'diagonal'],
  [50,'El Péndulo','Movimiento oscilante y constante. Como un péndulo hipnótico que te lleva a un estado de trance placentero.','intermedias',3,3,4,'rider'],
  [51,'La Bisagra','Él se dobla hacia adelante creando un ángulo que profundiza la conexión. Requiere flexibilidad de ambos.','intermedias',3,4,3,'behind'],
  [52,'El Engranaje','Movimientos sincronizados como engranajes perfectos. Eficiencia y placer en perfecta ingeniería.','intermedias',3,3,3,'seated'],
  [53,'La Vuelta','A mitad del camino, cambio de posición sin perder la conexión. Desafiante y muy satisfactorio.','intermedias',3,4,4,'acrobatic'],
  [54,'El Espiral','Movimiento en espiral ascendente que va creciendo en intensidad hasta el clímax inevitable.','intermedias',3,3,3,'diagonal'],
  [55,'La Balanza','Equilibrio perfecto de poder. Ninguno domina, ambos contribuyen por igual al placer compartido.','intermedias',3,3,3,'kneeling'],
  [56,'El Contrapeso','Usando el peso del otro como apoyo. Física y pasión combinadas en un ballet de contrapesos.','intermedias',4,4,4,'bridge'],
  [57,'La Rotación','Giro lento de 180 grados durante la conexión. Reto logístico con recompensa extraordinaria.','intermedias',3,3,4,'rider'],
  [58,'El Plano','Completamente horizontal pero con un ángulo que lo cambia todo. La diferencia está en los detalles.','intermedias',3,3,3,'lying_face'],
  [59,'La Inversión','El mundo al revés. Cambiar la perspectiva completamente para descubrir sensaciones nuevas.','intermedias',4,4,4,'acrobatic'],
  [60,'El Vórtice','Movimiento en espiral descendente hacia el centro del placer. Intenso y desorientador de la mejor manera.','intermedias',4,4,4,'acrobatic'],

  // AVANZADAS
  [61,'El Acróbata','Para los verdaderos atletas del amor. Requiere fuerza, flexibilidad y mucha confianza mutua.','avanzadas',5,5,5,'acrobatic'],
  [62,'La Contorsión','Al límite de la flexibilidad humana. Solo para los más entrenados y decididos a explorar todo.','avanzadas',5,5,4,'acrobatic'],
  [63,'El Aikido','Arte marcial del amor. Usar la energía del otro para amplificar el placer de ambos. Maestría pura.','avanzadas',4,4,5,'standing'],
  [64,'El Gimnasta','Dignos del podio olímpico. Fuerza, agilidad y coordinación al servicio de la pasión más intensa.','avanzadas',5,5,4,'acrobatic'],
  [65,'La Paloma','Elegante como una paloma en vuelo. Delicada en apariencia, intensa en sensación, difícil en práctica.','avanzadas',4,4,4,'bridge'],
  [66,'El Águila','Con la vista de águila sobre todo. Posición que da perspectiva total y control absoluto del encuentro.','avanzadas',5,5,5,'acrobatic'],
  [67,'La Araña','Ocho patas, un solo cuerpo. Entrelazamiento total que desafía la anatomía con resultados extraordinarios.','avanzadas',5,5,5,'acrobatic'],
  [68,'El Cosmos','Tan grande como el universo mismo. Movimientos expansivos que llevan el placer a dimensiones cósmicas.','avanzadas',4,5,5,'acrobatic'],
  [69,'La Centella','Rápida como un rayo. Intensidad máxima en el menor tiempo posible. Para cuando la paciencia no alcanza.','avanzadas',5,4,5,'rider'],
  [70,'El Universo','Todo el universo en un solo abrazo. La posición más completa y abarcadora que existe.','avanzadas',5,5,5,'acrobatic'],
  [71,'La Cúspide','En la cima de todo. El punto más alto al que puede llegar la experiencia compartida entre dos.','avanzadas',4,4,5,'bridge'],
  [72,'El Horizonte','Siempre hay más allá del horizonte. Posición que promete y cumple: siempre queda algo más por descubrir.','avanzadas',5,5,4,'acrobatic'],
  [73,'La Dimensión','Más allá de las tres dimensiones normales. Una experiencia que parece desafiar las leyes de la física.','avanzadas',5,5,5,'acrobatic'],
  [74,'El Infinito','Sin principio ni fin. Un bucle perfecto de placer que se retroalimenta indefinidamente.','avanzadas',5,5,5,'acrobatic'],
  [75,'La Galaxia','Millones de estrellas en un solo instante. La intensidad de una galaxia concentrada en dos cuerpos.','avanzadas',4,5,5,'acrobatic'],
  [76,'El Tornado','Destructivo y magnífico. Todo gira, todo se intensifica, nada queda igual después del tornado.','avanzadas',5,4,5,'rider'],
  [77,'La Tempestad','Cuando la calma se convierte en tormenta eléctrica. Imprevisible, poderosa, absolutamente memorable.','avanzadas',5,5,5,'acrobatic'],
  [78,'El Relámpago','Un destello de luz y poder. Breve pero tan intenso que deja su marca para siempre.','avanzadas',4,4,5,'standing'],
  [79,'La Tormenta','La naturaleza desatada en dos cuerpos. Caos hermoso que solo los valientes se atreven a vivir.','avanzadas',5,5,5,'acrobatic'],
  [80,'El Caos','Cuando las reglas no existen. Exploración libre y sin límites de todo lo que dos cuerpos pueden hacer.','avanzadas',5,5,5,'acrobatic'],

  // DIVERTIDAS
  [81,'La Rueda','Como ruedas que giran juntas. Movimiento continuo y divertido que hace reír y suspirar al mismo tiempo.','divertidas',3,3,3,'acrobatic'],
  [82,'El Tiovivo','Dando vueltas y vueltas. Festivo, alegre, y sorprendentemente placentero cuando se encuentra el ritmo.','divertidas',3,3,3,'rider'],
  [83,'La Escalera','Subiendo peldaño a peldaño hacia la cima. Progresiva e impredecible en cada escalón del placer.','divertidas',3,3,3,'standing'],
  [84,'El Trampolín','Arriba y abajo, arriba y abajo. Rebote lleno de energía que termina siempre en aterrizaje perfecto.','divertidas',3,4,4,'bridge'],
  [85,'La Catapulta','Tensión acumulada y liberación explosiva. Como una catapulta medieval pero mucho más agradable.','divertidas',4,4,4,'acrobatic'],
  [86,'El Cohete','Despegue rápido, vuelo intenso, aterrizaje suave. Toda una misión espacial en miniatura.','divertidas',3,3,4,'rider'],
  [87,'La Cometa','Liviana y libre como una cometa. El viento lleva y trae en un vaivén que no quieres que pare.','divertidas',3,3,3,'diagonal'],
  [88,'El Tren','Uno detrás del otro, todos en fila. Ritmo constante y profundo como las ruedas sobre el riel.','divertidas',2,2,3,'behind'],
  [89,'La Montaña Rusa','Emociones extremas garantizadas. Subidas y bajadas, curvas inesperadas, gritos de emoción.','divertidas',4,4,5,'acrobatic'],
  [90,'El Paracaídas','La caída libre más placentera. Sensación de volar seguida de aterrizaje suave y satisfactorio.','divertidas',3,3,3,'bridge'],

  // CREATIVAS
  [91,'El Arte','El cuerpo como lienzo. Movimientos que son arte en sí mismos, una galería privada de sensaciones.','creativas',3,3,3,'lotus'],
  [92,'La Escultura','Modelando el cuerpo del otro con manos y cuerpo. Arte táctil en su expresión más íntima.','creativas',3,3,3,'kneeling'],
  [93,'El Origami','Doblando y desplegando como papel japonés. Cada pliegue revela una nueva forma de conectar.','creativas',4,4,3,'diagonal'],
  [94,'La Pintura','Pinceladas largas y suaves sobre el cuerpo del otro. El arte más bello se pinta sin pincel.','creativas',2,2,3,'lying_face'],
  [95,'El Jazz','Improvisación pura. Sin partitura, sin guión. Seguir el instinto y crear algo único cada vez.','creativas',3,3,4,'standing'],
  [96,'La Improvisación','Teatro del amor sin ensayo. Cada movimiento surge espontáneo, cada reacción es genuina.','creativas',3,3,4,'acrobatic'],
  [97,'El Haiku','Poesía breve y perfecta. Tres líneas, diecisiete sílabas, un momento eterno de conexión.','creativas',2,2,2,'seated'],
  [98,'La Sinestesia','Cuando todos los sentidos se mezclan. Ver el sonido, escuchar el tacto, sentir los colores juntos.','creativas',4,4,4,'acrobatic'],
  [99,'El Surrealismo','Salvador Dalí en carne y hueso. Posición que desafía la lógica pero tiene todo el sentido emocional.','creativas',4,4,4,'diagonal'],
  [100,'La Abstracción','Más allá de la forma, solo sensación pura. El punto donde el cuerpo deja de ser cuerpo.','creativas',5,5,5,'acrobatic'],
]

export const positions = raw.map(([id, nombre, descripcion, categoria, dificultad, flexibilidad, intensidad, svgType]) => ({
  id, nombre, descripcion, categoria, dificultad, flexibilidad, intensidad, svgType,
  isCustom: false,
}))

export const getPositionById = (id) => positions.find(p => p.id === Number(id))
export const getPositionsByCategory = (cat) => positions.filter(p => p.categoria === cat)
