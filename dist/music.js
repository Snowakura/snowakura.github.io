const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    theme: '#66ccff',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    mutex: true,
    listFolded: true,
    listMaxHeight: 90,
    lrcType: 3,
    audio: [
      {
        name: "星と君が消えた日",
        artist: '泠鸢yousa',
        url: 'http://localhost:4000/music/泠鸢yousa - 星と君が消えた日.mp3',
        cover: 'http://localhost:4000/music/泠鸢yousa - 星と君が消えた日.png',
        lrc: 'http://localhost:4000/music/泠鸢yousa - 星と君が消えた日.lrc',
      },

      {
        name: "晓秋月明",
        artist: '泠鸢yousa',
        url: 'http://localhost:4000/music/泠鸢yousa - 晓秋月明.mp3',
        cover: 'http://localhost:4000/music/泠鸢yousa - 晓秋月明.png',
        lrc: 'http://localhost:4000/music/泠鸢yousa - 晓秋月明.lrc',
      },

      {
        name: "洛天依",
        artist: '嘘つきは恋のはじまり',
        url: 'http://localhost:4000/music/洛天依 - 嘘つきは恋のはじまり.mp3',
        cover: 'http://p2.music.126.net/_NRPs8ryxC_2fMA1FcJWmA==/109951163249919143.jpg?param=130y130',
        lrc: 'http://localhost:4000/music/洛天依 - 嘘つきは恋のはじまり.lrc',
      },

      {
        name: "君がいる世界へ",
        artist: '鹿乃',
        url: 'http://localhost:4000/music/鹿乃 - 君がいる世界へ.mp3',
        cover: 'http://p1.music.126.net/bpkV1doAwRan7WA7yNlETA==/109951163509176176.jpg?param=130y130',
        lrc: 'http://localhost:4000/music/鹿乃 - 君がいる世界へ.lrc',
      },

      {
        name: "繋ぎとめた世界",
        artist: '黒須克彦,帆足圭吾',
        url: 'http://localhost:4000/music/黒須克彦,帆足圭吾 - 繋ぎとめた世界.mp3',
        cover: 'http://p1.music.126.net/T2etSRdkmhn1Hlohu7Jbfg==/7716372604710408.jpg?param=130y130',
        
      },

      {
        name: "3人でいる時間",
        artist: '北川勝利,帆足圭吾',
        url: 'http://localhost:4000/music/北川勝利,帆足圭吾 - 3人でいる時間.mp3',
        cover: 'http://p1.music.126.net/T2etSRdkmhn1Hlohu7Jbfg==/7716372604710408.jpg?param=130y130',
        
      },

      {
        name: "hometown",
        artist: 'mamomo',
        url: 'http://localhost:4000/music/mamomo - hometown.mp3',
        
        
      },

      {
        name: "东京冬日相会（Cover －）",
        artist: 'Hanser,YUKIri',
        url: 'http://localhost:4000/music/Hanser,YUKIri - 东京冬日相会（Cover －）.mp3',
        cover: 'http://p1.music.126.net/9GAbSb_hlXPu66HWInJOww==/109951162846052486.jpg?param=130y130',
        lrc: 'http://localhost:4000/music/Hanser,YUKIri - 东京冬日相会（Cover －）.lrc',
      },

      {
        name: "吃货也想谈恋爱",
        artist: 'Hanser',
        url: 'http://localhost:4000/music/Hanser - 吃货也想谈恋爱.mp3',
        cover: 'http://p2.music.126.net/Mw7z4vn0EMrWlitsiYgzPQ==/109951163606870393.jpg?param=130y130',
        lrc: 'http://localhost:4000/music/Hanser - 吃货也想谈恋爱.lrc',
      },

      {
        name: "After All Tsuduru Omoi",
        artist: 'Touma Kazusa',
        url: 'http://localhost:4000/music/04 - Touma Kazusa - After All Tsuduru Omoi.mp3',
        cover: 'http://localhost:4000/music/04 - Touma Kazusa - After All Tsuduru Omoi.png',
        lrc: 'http://localhost:4000/music/04 - Touma Kazusa - After All Tsuduru Omoi.lrc',
      },

      {
        name: "Lemon",
        artist: '米津玄師',
        url: 'http://localhost:4000/music/米津玄師 - Lemon.mp3',
        cover: 'http://p1.music.126.net/6IeZ9MiSSDXifj74nzH6ww==/109951163561494000.jpg?param=130y130',
        lrc: 'http://localhost:4000/music/米津玄師 - Lemon.lrc',
      },

      {
        name: 'ふわふわ',
        artist: '牧野由依',
        url: 'http://localhost:4000/music/牧野由依 - ふわふわ.mp3',
        cover: 'http://p2.music.126.net/Zuc85Tj7XN2NYCKdg26zlw==/4402444557617810.jpg?param=130y130',
        lrc: 'http://localhost:4000/music/牧野由依 - ふわふわ.lrc',
      }
    ]
});