export type TopicObject ={
    name: string, 
    endpoint: string,
}
export type TopicsGroup = {
    [key: string]: TopicObject[],
}
export type TopicHead = TopicObject | TopicsGroup

export const topics: TopicHead[] = [
  {
    "Internet Culture (Viral)": [
      { name: "Amazing", endpoint: "Amazing" },
      { name: "Animals_&_Pets", endpoint: "AnimalsBeingDerps" },
      { name: "Cringe_&_Facepalm", endpoint: "Cringepics" },
      { name: "Funny", endpoint: "Funny" },
      { name: "Interesting", endpoint: "Interestingasfuck" },
      { name: "Memes", endpoint: "memes" },
      { name: "Oddly_Satisfying", endpoint: "Satisfyingasfuck" },
      { name: "Reddit_Meta", endpoint: "reddit.com" },
      { name: "Wholesome_&_Heartwarming", endpoint: "wholesome" },
      { name: "Stories_&_Confessions", endpoint: "stories" }
    ]
  },
  {
    "Games": [
      { name: "Adventure_Games", endpoint: "adventuregames" },
      { name: "Role-Playing_Games", endpoint: "rpg" },
      { name: "Esports", endpoint: "esports" },
      { name: "Gaming_News_&_Discussion", endpoint: "gamingnews" },
      { name: "Mobile_Games", endpoint: "MobileGaming" },
      { name: "Other_Games", endpoint: "Games" },
      { name: "Simulation_Games", endpoint: "SimulationGaming" },
      { name: "Sports_&_Racing_Games", endpoint: "racinggames" },
      { name: "Strategy_Games", endpoint: "StrategyGames" },
      { name: "Tabletop_Games", endpoint: "tabletopgamedesign" }
    ]
  },
  {
    "Technology": [
      { name: "3D_Printing", endpoint: "3Dprinting" },
      { name: "Artificial_Intelligence", endpoint: "ArtificialInteligence" },
      { name: "Machine_Learning", endpoint: "MachineLearning" },
      { name: "Computers_&_Hardware", endpoint: "hardware" },
      { name: "Consumer_Electronics", endpoint: "electronics" },
      { name: "DIY_Electronics", endpoint: "DIYElectronicCircuits" },
      { name: "Programming", endpoint: "Programming" },
      { name: "Software_&_Apps", endpoint: "softwaregore" },
      { name: "Tech_News_&_Discussion", endpoint: "technews" },
      { name: "Virtual_&_Augmented_Reality", endpoint: "virtualreality" }
    ]
  },
  {
    "Pop Culture": [
      { name: "Creators_&_Influencers", endpoint: "Influencersinthewild" },
      { name: "Generations_&_Nostalgia", endpoint: "nostalgia" },
      { name: "Podcast", endpoint: "podcasts" },
      { name: "Streamers", endpoint: "Streamers" },
      { name: "Astrology", endpoint: "astrology" }
    ]
  },
  { name: "Popular", endpoint: "popular" },
  { name: "Anime", endpoint: "anime" },
  { name: "Arts", endpoint: "artstore" },
  { name: "Business", endpoint: "business" },
  { name: "Collectibles_&_Other_Hobbies", endpoint: "Hobbies" },
  { name: "Fashion_&_Beauty", endpoint: "fashion" },
  { name: "Food_and_Drink", endpoint: "food" },
  { name: "Home_&_Garden", endpoint: "Garten" },
  { name: "Humanities_&_Law", endpoint: "law" },
  { name: "Music", endpoint: "Music" },
  { name: "Movies", endpoint: "movies" },
  { name: "Nature_&_Outdoors", endpoint: "NatureIsFuckingLit" },
  { name: "News", endpoint: "news" },
  { name: "Politics", endpoint: "politics" },
  { name: "Places_&_Travel", endpoint: "travel" },
  { name: "Science", endpoint: "science" },
  { name: "Sports", endpoint: "sports" },
  { name: "Spooky", endpoint: "spooky_stories" },
  { name: "Cars", endpoint: "cars" }
];

export function isTopicGroup(topicHead: TopicHead): topicHead is TopicsGroup {
  return Array.isArray(Object.values(topicHead)[0]);
}

export function getAllTopics(): TopicObject[]{
  return topics.flatMap((topicHead) => {
    return isTopicGroup(topicHead) ? Object.values(topicHead)[0] : topicHead
  })
}
export function getAllTopicGroups(): TopicsGroup[]{
  return topics.filter((topicHead) => {
    return isTopicGroup(topicHead)
  })
}