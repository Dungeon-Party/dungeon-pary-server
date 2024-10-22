import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const abilityScores = [
  {
    name: 'STR',
    full_name: 'Strength',
    desc: 'Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.',
    skills: {
      create: [
        {
          name: 'Athletics',
          desc: 'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming.',
        },
      ],
    },
  },
  {
    name: 'DEX',
    full_name: 'Dexterity',
    desc: 'Dexterity measures agility, reflexes, and balance.',
    skills: {
      create: [
        {
          name: 'Acrobatics',
          desc: 'Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck.',
        },
        {
          name: 'Sleight of Hand',
          desc: 'Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check.',
        },
        {
          name: 'Stealth',
          desc: 'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.',
        },
      ],
    },
  },
  {
    name: 'CON',
    full_name: 'Constitution',
    desc: 'Constitution measures health, stamina, and vital force.',
  },
  {
    name: 'INT',
    full_name: 'Intelligence',
    desc: 'Intelligence measures mental acuity, accuracy of recall, and the ability to reason.',
    skills: {
      create: [
        {
          name: 'Arcana',
          desc: 'Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.',
        },
        {
          name: 'History',
          desc: 'Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.',
        },
        {
          name: 'Investigation',
          desc: 'When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check.',
        },
        {
          name: 'Nature',
          desc: 'Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.',
        },
        {
          name: 'Religion',
          desc: 'Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.',
        },
      ],
    },
  },
  {
    name: 'WIS',
    full_name: 'Wisdom',
    desc: 'Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.',
    skills: {
      create: [
        {
          name: 'Animal Handling',
          desc: 'When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal’s intentions, the GM might call for a Wisdom (Animal Handling) check.',
        },
        {
          name: 'Insight',
          desc: 'Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone’s next move.',
        },
        {
          name: 'Medicine',
          desc: 'A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness.',
        },
        {
          name: 'Perception',
          desc: 'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something.',
        },
        {
          name: 'Survival',
          desc: 'The GM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards.',
        },
      ],
    },
  },
  {
    name: 'CHA',
    full_name: 'Charisma',
    desc: 'Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality.',
    skills: {
      create: [
        {
          name: 'Deception',
          desc: 'Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions.',
        },
        {
          name: 'Intimidation',
          desc: 'When you attempt to influence someone through overt threats, hostile actions, and physical violence, the GM might ask you to make a Charisma (Intimidation) check.',
        },
        {
          name: 'Performance',
          desc: 'Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.',
        },
        {
          name: 'Persuasion',
          desc: 'When you attempt to influence someone or a group of people with tact, social graces, or good nature, the GM might ask you to make a Charisma (Persuasion) check.',
        },
      ],
    },
  },
]

const classes = [
  {
    name: 'Barbarian',
    desc: 'A fierce warrior of primitive background who can enter a battle rage',
    hit_die: 12,
  },
  {
    name: 'Bard',
    desc: 'An inspiring magician whose power echoes the music of creation',
    hit_die: 8,
  },
  {
    name: 'Cleric',
    desc: 'A priestly champion who wields divine magic in service of a higher power',
    hit_die: 8,
  },
  {
    name: 'Druid',
    desc: 'A priest of the Old Faith, wielding the powers of nature—moonlight and plant growth, fire and lightning—and adopting animal forms',
    hit_die: 8,
  },
  {
    name: 'Fighter',
    desc: 'A master of martial combat, skilled with a variety of weapons and armor',
    hit_die: 10,
  },
  {
    name: 'Monk',
    desc: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection',
    hit_die: 8,
  },
  {
    name: 'Paladin',
    desc: 'A holy warrior bound to a sacred oath',
    hit_die: 10,
  },
  {
    name: 'Ranger',
    desc: 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization',
    hit_die: 10,
  },
  {
    name: 'Rogue',
    desc: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies',
    hit_die: 8,
  },
  {
    name: 'Sorcerer',
    desc: 'A spellcaster who draws on inherent magic from a gift or bloodline',
    hit_die: 6,
  },
  {
    name: 'Warlock',
    desc: 'A wielder of magic that is derived from a bargain with an extraplanar entity',
    hit_die: 8,
  },
  {
    name: 'Wizard',
    desc: 'A scholarly magic-user capable of manipulating the structures of reality',
    hit_die: 6,
  },
]

const subClasses = {
  '5e-2014': {
    Barbarian: [
      {
        name: 'Path of the Berserker',
        desc: 'For some barbarians, rage is a means to an end—that end being violence. The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker’s rage, you thrill in the chaos of battle, heedless of your own health or well-being.',
      },
      {
        name: 'Path of the Totem Warrior',
        desc: 'The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration. In battle, your totem spirit fills you with supernatural might, adding magical fuel to your barbarian rage.',
      },
    ],
    Bard: [
      {
        name: 'College of Lore',
        desc: 'Bards of the College of Lore know something about most things, collecting bits of knowledge from sources as diverse as scholarly tomes and peasant tales. Whether singing folk ballads in taverns or elaborate compositions in royal courts, these bards use their gifts to hold audiences spellbound. When the applause dies down, the College of Lore bards might continue their adventuring career, but they remain accomplished artists and performers.',
      },
      {
        name: 'College of Valor',
        desc: 'Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past, and thereby inspire a new generation of heroes. These bards gather in mead halls or around great bonfires to sing the deeds of the mighty, both past and present. They travel the land to witness great events firsthand and to ensure that the memory of those events doesn’t pass from the world. With their songs, they inspire others to reach the same heights of accomplishment as the heroes of old.',
      },
    ],
    Cleric: [
      {
        name: 'Knowledge Domain',
        desc: 'The gods of knowledge—including Oghma, Boccob, Gilean, Aureon, and Thoth—value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities, or promote the practical knowledge of craft and invention. Some deities hoard knowledge and keep its secrets to themselves. And some promise their followers that they will gain tremendous power if they unlock the secrets of the multiverse. Followers of these',
      },
      {
        name: 'Life Domain',
        desc: 'The Life domain focuses on the vibrant positive energy—one of the fundamental forces of the universe—that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath. Almost any non-evil deity can claim influence over this domain, particularly agricultural deities, sun gods, gods of healing or endurance, and gods of home and community.',
      },
      {
        name: 'Light Domain',
        desc: 'Gods of light—including Helm, Lathander, Pholtus, Branchala, the Silver Flame, Belenus, Apollo, and Re-Horakhty—promote the ideals of rebirth and renewal, truth, vigilance, and beauty, often using the symbol of the sun. Some of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. They tend to be associated with healing or purifying fire, light, the sun, and the sky.',
      },
      {
        name: 'Nature Domain',
        desc: 'Gods of nature are as varied as the natural world itself, from inscrutable gods of the deep forests (such as Silvanus, Obad-Hai, Chislev, Balinor, and Pan) to friendly deities associated with particular springs and groves (such as Eldath). Druids revere nature as a whole and might serve one of these deities, practicing mysterious rites and reciting all-but-forgotten prayers in their own secret tongue. But many of these gods have clerics as well, champions who take a more active role in advancing the interests of a particular nature god.',
      },
      {
        name: 'Tempest Domain',
        desc: 'Gods whose portfolios include the Tempest domain—such as Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor—govern storms, sea, and sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage. In some pantheons, a god of this domain rules over other deities and is known for swift justice delivered by thunderbolts.',
      },
      {
        name: 'Trickery Domain',
        desc: 'Gods of trickery—such as Tymora, Beshaba, Olidammara, the Traveler, Garl Glittergold, and Loki—are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals. They’re patrons of thieves, scoundrels, gamblers, rebels, and liberators. Their clerics are a disruptive force in the world, puncturing pride, mocking tyrants, stealing from the rich, freeing captives, and flouting hollow traditions.',
      },
      {
        name: 'War Domain',
        desc: 'War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage. In either case, the gods of war watch over warriors and reward them for their great deeds. The clerics of such gods excel in battle, inspiring others to fight the good fight or offering acts of violence as prayers.',
      },
    ],
    Druid: [
      {
        name: 'Circle of the Land',
        desc: 'Druids who are members of the Circle of the Land are mystics and sages who safeguard ancient knowledge and work the magic of the land. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle’s wisest members preside as the chief priests of communities that hold to the Old Faith and serve as advisors to the rulers of those folk. As a member of this circle, your magic is influenced by the land where you were initiated into the circle’s mysterious rites.',
      },
      {
        name: 'Circle of the Moon',
        desc: 'Druids of the Circle of the Moon are fierce guardians of the wilds. Their order gathers under the full moon to share news and trade warnings. They haunt the deepest parts of the wilderness, where they might go for weeks on end before crossing paths with another humanoid creature, let alone another druid. This circle is the most accepting of lycanthropes and other shapechangers as fellow druids.',
      },
    ],
    Fighter: [
      {
        name: 'Champion',
        desc: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.',
      },
      {
        name: 'Battle Master',
        desc: 'Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy.',
      },
    ],
  },
  '5e-2024': {},
}

function getClasses(systemVersion) {
  return classes.map((c) => {
    return {
      ...c,
      subclasses: {
        create: subClasses[systemVersion][c.name]
          ? subClasses[systemVersion][c.name]
          : [],
      },
    }
  })
}

async function main() {
  await prisma.user.upsert({
    where: { email: 'rick@prisma.io' },
    update: {},
    create: {
      name: 'Rick',
      username: 'rick',
      email: 'rick@prisma.io',
      password: 'password',
    },
  })
  await prisma.system.upsert({
    where: { name: 'Dungeons and Dragons 5e' },
    update: {},
    create: {
      name: 'Dungeons and Dragons 5e',
      desc: 'Dungeons and Dragons 5th Edition is a tabletop role-playing game',
      system_versions: {
        create: [
          {
            version: '5e-2014',
            ability_scores: {
              create: abilityScores,
            },
            classes: {
              create: getClasses('5e-2014'),
            },
          },
          {
            version: '5e-2024',
            ability_scores: {
              create: abilityScores,
            },
            classes: {
              create: getClasses('5e-2024'),
            },
          },
        ],
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
