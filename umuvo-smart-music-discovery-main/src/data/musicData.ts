import { Header } from "@radix-ui/react-accordion";

export interface Song {
  id: string;
  title: string;
  artist: string;
  //genre: string;
  coverUrl: string;
}

export interface Genre {
  id: string;
  name: string;
}

export const genres: Genre[] = [
  { id: "pop", name: "Pop" },
  { id: "rock", name: "Rock" },
  { id: "hip-hop", name: "Hip-Hop/Rap" },
  { id: "eletronica", name: "Eletrônica" },
  { id: "mpb", name: "MPB" },
  { id: "sertanejo", name: "Sertanejo" },
  { id: "funk", name: "Funk" },
  { id: "indie", name: "Indie" },
  { id: "jazz", name: "Jazz" },
  { id: "classica", name: "Clássica" },
  { id: "reggae", name: "Reggae" },
  { id: "rnb", name: "R&B" },
];

async function getPopTracks(){
  const r = await fetch('http://127.0.0.1:8000/popular-tracks/20',)
  return r.json()
}

export const songs: Song[] = await getPopTracks() 




/*[

  // Pop https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", genre: "pop", coverUrl: ""},
  { id: "2", title: "As It Was", artist: "Harry Styles", genre: "pop", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  { id: "3", title: "Levitating", artist: "Dua Lipa", genre: "pop", coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop" },
  
  // Rock
  { id: "4", title: "Bohemian Rhapsody", artist: "Queen", genre: "rock", coverUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop" },
  { id: "5", title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "rock", coverUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=400&fit=crop" },
  { id: "6", title: "Back in Black", artist: "AC/DC", genre: "rock", coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop" },
  
  // Hip-Hop/Rap
  { id: "7", title: "God's Plan", artist: "Drake", genre: "hip-hop", coverUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop" },
  { id: "8", title: "HUMBLE.", artist: "Kendrick Lamar", genre: "hip-hop", coverUrl: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=400&fit=crop" },
  { id: "9", title: "SICKO MODE", artist: "Travis Scott", genre: "hip-hop", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  
  // Eletrônica
  { id: "10", title: "One More Time", artist: "Daft Punk", genre: "eletronica", coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop" },
  { id: "11", title: "Clarity", artist: "Zedd", genre: "eletronica", coverUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop" },
  { id: "12", title: "Don't You Worry Child", artist: "Swedish House Mafia", genre: "eletronica", coverUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop" },
  
  // MPB
  { id: "13", title: "Águas de Março", artist: "Tom Jobim & Elis Regina", genre: "mpb", coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop" },
  { id: "14", title: "Construção", artist: "Chico Buarque", genre: "mpb", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  { id: "15", title: "Sozinho", artist: "Caetano Veloso", genre: "mpb", coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop" },
  
  // Sertanejo
  { id: "16", title: "Evidências", artist: "Chitãozinho & Xororó", genre: "sertanejo", coverUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop" },
  { id: "17", title: "Batom de Cereja", artist: "Israel & Rodolffo", genre: "sertanejo", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  { id: "18", title: "Atrasadinha", artist: "Felipe Araújo", genre: "sertanejo", coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop" },
  
  // Funk
  { id: "19", title: "Bum Bum Tam Tam", artist: "MC Fioti", genre: "funk", coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop" },
  { id: "20", title: "Vai Malandra", artist: "Anitta", genre: "funk", coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop" },
  { id: "21", title: "Onda Diferente", artist: "Ludmilla", genre: "funk", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  
  // Indie
  { id: "22", title: "Mr. Brightside", artist: "The Killers", genre: "indie", coverUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=400&fit=crop" },
  { id: "23", title: "Ho Hey", artist: "The Lumineers", genre: "indie", coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop" },
  { id: "24", title: "Take Me Out", artist: "Franz Ferdinand", genre: "indie", coverUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop" },
  
  // Jazz
  { id: "25", title: "So What", artist: "Miles Davis", genre: "jazz", coverUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop" },
  { id: "26", title: "Take Five", artist: "Dave Brubeck Quartet", genre: "jazz", coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop" },
  { id: "27", title: "Fly Me to the Moon", artist: "Frank Sinatra", genre: "jazz", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  
  // Clássica
  { id: "28", title: "Für Elise", artist: "Beethoven", genre: "classica", coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { id: "29", title: "Symphony No. 5", artist: "Beethoven", genre: "classica", coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop" },
  { id: "30", title: "The Four Seasons", artist: "Vivaldi", genre: "classica", coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop" },
  
  // Reggae
  { id: "31", title: "Three Little Birds", artist: "Bob Marley", genre: "reggae", coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop" },
  { id: "32", title: "No Woman, No Cry", artist: "Bob Marley", genre: "reggae", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  { id: "33", title: "Red Red Wine", artist: "UB40", genre: "reggae", coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop" },
  
  // R&B
  { id: "34", title: "Crazy in Love", artist: "Beyoncé", genre: "rnb", coverUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop" },
  { id: "35", title: "Thinkin Bout You", artist: "Frank Ocean", genre: "rnb", coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop" },
  { id: "36", title: "Leave the Door Open", artist: "Silk Sonic", genre: "rnb", coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop" },


];*/
