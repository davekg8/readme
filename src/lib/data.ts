export type Chapter = {
  id: string;
  title: string;
  content: string;
  summary?: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  chapters: Chapter[];
};

export const books: Book[] = [
  {
    id: 'the-crimson-trail',
    title: 'The Crimson Trail',
    author: 'Elara Vance',
    chapters: [
      {
        id: '1',
        title: 'The Whispering Woods',
        content: `The wind howled a mournful tune through the gnarled branches of the Whispering Woods. Kaelen, a ranger with eyes the color of the forest floor, pulled his cloak tighter. For weeks, he had tracked the beast, a creature of shadow and malice that left a trail of desiccated husks in its wake. Tonight, the trail was fresh. The air, thick with the scent of pine and decay, carried a new, acrid odor—the unmistakable stench of dark magic. He drew his silver-inlaid blade, its surface gleaming under the sliver of a crescent moon. He was close. The whispers of the woods were not just the wind tonight; they were voices, ancient and angry, and they were guiding him to his prey.`,
        summary: 'A ranger named Kaelen tracks a shadowy beast through the ominous Whispering Woods, guided by supernatural voices and the scent of dark magic.'
      },
      {
        id: '2',
        title: 'A Village in Fear',
        content: `Beyond the woods lay the village of Oakhaven, a place once known for its vibrant festivals, now shrouded in a palpable silence. The villagers scurried into their homes as dusk fell, their faces etched with fear. Kaelen entered the local inn, The Prancing Pony, where the usual boisterous atmosphere was replaced with hushed conversations. He approached the bar, and the innkeeper, a burly man named Borin, slid him a mug of ale. "The beast was seen near the old mill," Borin grumbled, his voice low. "Took another sheep. Won't be long before it's one of us." Kaelen nodded grimly. His fight was not just for the woods, but for these people.`,
      },
      {
        id: '3',
        title: 'The Elder\'s Secret',
        content: `The village elder, a woman named Lyra with eyes that held the wisdom of generations, summoned Kaelen to her cottage. It was a cozy place, filled with the aroma of drying herbs and old parchment. "The beast you hunt is no ordinary creature," she said, her voice a fragile whisper. "It is a Shade, a being born of a powerful curse laid upon these lands centuries ago." She revealed an ancient tapestry depicting a battle between a sorcerer and a knight. "The curse can only be broken by the Sunstone, an artifact lost to time." Kaelen's quest had just become far more complicated.`,
      },
    ],
  },
  {
    id: 'the-stars-of-yesterday',
    title: 'The Stars of Yesterday',
    author: 'Orion Blackwood',
    chapters: [
      {
        id: '1',
        title: 'The Rogue Planet',
        content: `From the copper-domed observatory on Mount Cinder, Astrologer Valerius watched the heavens with a growing sense of dread. For generations, his family had been the Keepers of the Celestial Charts, and never in their recorded history had a celestial body behaved so erratically. A new point of light, a violet shimmer against the inky black, moved not with the predictable grace of planets or the distant twinkle of stars, but with a purpose that felt malevolent. It wasn't on any chart. It wasn't a star. It was an omen, and its arrival coincided with the withering of the Oracle's sacred moonpetal flowers in the capital city far below.`,
      },
      {
        id: '2',
        title: 'A Summons to the Capital',
        content: `A royal courier arrived at dawn, his horse lathered and breathing hard. The King himself summoned Valerius to the capital. The message was sealed with the royal crest, its wax the color of dried blood. Valerius packed his satchel with his most trusted star charts, a brass astrolabe, and a heavy heart. He knew this summons was about the violet "star." The royal court was a nest of vipers, a place where science was often dismissed as superstition. He would have to convince them of a danger they could not yet see, a threat written not in earthly decrees, but in the cold, uncaring language of the cosmos.`,
      },
    ],
  },
];

export const getChapter = (bookId: string, chapterId: string) => {
  const book = books.find(b => b.id === bookId);
  if (!book) return null;
  const chapter = book.chapters.find(c => c.id === chapterId);
  if (!chapter) return null;

  const chapterIndex = book.chapters.findIndex(c => c.id === chapterId);
  const prevChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : null;

  return { book, chapter, prevChapter, nextChapter };
};
