export interface Constituency {
    name: string;
    wards: string[];
}

export interface County {
    name: string;
    constituencies: Constituency[];
}

export const kenyaLocations: County[] = [
    {
        name: "Nairobi",
        constituencies: [
            { name: "Westlands", wards: ["Kitisuru", "Parklands/Highridge", "Karura", "Kangemi", "Mountain View"] },
            { name: "Dagoretti North", wards: ["Kilimani", "Kawangware", "Gatina", "Kileleshwa", "Kabiro"] },
            { name: "Dagoretti South", wards: ["Mutu-ini", "Ngand'o", "Riruta", "Uthiru/Ruthimitu", "Waithaka"] },
            { name: "Lang'ata", wards: ["Karen", "Nairobi West", "Mugumo-ini", "South C", "Nyayo Highrise"] },
            { name: "Kibra", wards: ["Laini Saba", "Lindi", "Makina", "Woodley/Kenyatta Golf Course", "Sarang'ombe"] },
            { name: "Roysambu", wards: ["Githurai", "Kahawa West", "Zimmerman", "Roysambu", "Kahawa"] },
            { name: "Kasarani", wards: ["Clay City", "Mwiki", "Kasarani", "Njiru", "Ruai"] },
            { name: "Ruaraka", wards: ["Babadogo", "Utalii", "Mathare North", "Lucky Summer", "Korogocho"] },
            { name: "Embakasi South", wards: ["Imara Daima", "Kwa Njenga", "Kwa Reuben", "Piper", "Kware"] },
            { name: "Embakasi North", wards: ["Kariobangi North", "Dandora Area I", "Dandora Area II", "Dandora Area III", "Dandora Area IV"] },
            { name: "Embakasi Central", wards: ["Kayole North", "Kayole North Central", "Kayole South", "Komarock", "Matopeni/Spring Valley"] },
            { name: "Embakasi East", wards: ["Upper Savanna", "Lower Savanna", "Embakasi", "Utawala", "Mihang'o"] },
            { name: "Embakasi West", wards: ["Umoja I", "Umoja II", "Mowlem", "Kariobangi South"] },
            { name: "Makadara", wards: ["Maringo/Hamza", "Viwandani", "Harambee", "Makongeni"] },
            { name: "Kamukunji", wards: ["Pumwani", "Eastleigh North", "Eastleigh South", "Airbase", "California"] },
            { name: "Starehe", wards: ["Nairobi Central", "Ngara", "Pangani", "Ziwani/Kariokor", "Landi Mawe", "Nairobi South"] },
            { name: "Mathare", wards: ["Hospital", "Mabatini", "Huruma", "Ngei", "Mlango Kubwa", "Kiamaiko"] }
        ]
    },
    {
        name: "Mombasa",
        constituencies: [
            { name: "Changamwe", wards: ["Port Reitz", "Kipevu", "Airport", "Changamwe", "Chaani"] },
            { name: "Jomvu", wards: ["Jomvu Kuu", "Miritini", "Mikindani"] },
            { name: "Kisauni", wards: ["Mjambere", "Junda", "Bamburi", "Mwakirunge", "Magogoni", "Shanzu", "Frere Town"] },
            { name: "Nyali", wards: ["Frere Town", "Ziwa La Ng'ombe", "Mkomani", "Kongowea", "Kadzandani"] },
            { name: "Likoni", wards: ["Mtongwe", "Shika Adabu", "Bofu", "Likoni", "Timbwani"] },
            { name: "Mvita", wards: ["Mji wa Kale/Makadara", "Tudor", "Tononoka", "Shimanzi/Ganjoni", "Majengo"] }
        ]
    },
    {
        name: "Nakuru",
        constituencies: [
            { name: "Molo", wards: ["Mariashoni", "Elburgon", "Turi", "Molo"] },
            { name: "Njoro", wards: ["Mau Narok", "Mauche", "Kihingo", "Nessuit", "Lare", "Njoro"] },
            { name: "Naivasha", wards: ["Biashara", "Hells Gate", "Lake View", "Mai Mahiu", "Maiella", "Olkaria", "Naivasha East", "Viwandani"] },
            { name: "Gilgil", wards: ["Gilgil", "Elementaita", "Mbaruk/Eburu", "Malewa West", "Murindati"] },
            { name: "Kuresoi South", wards: ["Amalo", "Keringet", "Kiptagich", "Tinet"] },
            { name: "Kuresoi North", wards: ["Kiptororo", "Nyota", "Sirikwa", "Kamara"] },
            { name: "Subukia", wards: ["Subukia", "Waseges", "Kabazi"] },
            { name: "Rongai", wards: ["Menengai West", "Soin", "Visoi", "Mosop", "Solai"] },
            { name: "Bahati", wards: ["Dundori", "Kabatini", "Kiamaina", "Lanet/Umoja", "Bahati"] },
            { name: "Nakuru Town West", wards: ["Barut", "London", "Kaptembwo", "Kapkures", "Rhoda", "Shaabab"] },
            { name: "Nakuru Town East", wards: ["Biashara", "Flamingo", "Menengai", "Nakuru East", "Kivumbini"] }
        ]
    },
    {
        name: "Kwale",
        constituencies: [
            { name: "Msambweni", wards: ["Gombato Bongwe", "Ukunda", "Kinondo", "Ramisi"] },
            { name: "Lunga Lunga", wards: ["Dzombo", "Mwereni", "Pongwe/Kikoneni", "Vanga"] },
            { name: "Matuga", wards: ["Tsimba Golini", "Waa", "Tiwi", "Kubo South", "Mkongani"] },
            { name: "Kinango", wards: ["Kinango", "Mwavumbo", "Kasenemi", "Puma", "Samburu", "Mackinnon Road", "Ndavaya"] }
        ]
    },
    {
        name: "Kilifi",
        constituencies: [
            { name: "Kilifi North", wards: ["Tezo", "Sokoni", "Kibarani", "Dabaso", "Matsangoni", "Watamu", "Mnarani"] },
            { name: "Kilifi South", wards: ["Junju", "Mwarakaya", "Shimo la Tewa", "Chasimba", "Mtepeni"] },
            { name: "Kaloleni", wards: ["Mariakani", "Kayafungo", "Kaloleni", "Mwanamwinga"] },
            { name: "Rabai", wards: ["Mwawesa", "Ruruma", "Jibana", "Rabai/Kisurutuni"] },
            { name: "Ganze", wards: ["Dungicha", "Bamba", "Jaribuni", "Sokoke"] },
            { name: "Malindi", wards: ["Jilore", "Kakuyuni", "Ganda", "Malindi Town", "Shella"] },
            { name: "Magarini", wards: ["Marafa", "Magarini", "Gongoni", "Adu", "Garashi", "Sabaki"] }
        ]
    },
    {
        name: "Tana River",
        constituencies: [
            { name: "Garsen", wards: ["Kipini East", "Garsen South", "Kipini West", "Garsen Central", "Garsen West", "Garsen North"] },
            { name: "Galole", wards: ["Chewani", "Kinakomba", "Wayu", "Mikinduni"] },
            { name: "Bura", wards: ["Chewele", "Hirimani", "Bangale", "Sala", "Madogo"] }
        ]
    },
    {
        name: "Lamu",
        constituencies: [
            { name: "Lamu East", wards: ["Faza", "Kiunga", "Basuba"] },
            { name: "Lamu West", wards: ["Shella", "Mkomani", "Hindi", "Mkunumbi", "Hongwe", "Witu", "Bahari"] }
        ]
    },
    {
        name: "Taita Taveta",
        constituencies: [
            { name: "Taveta", wards: ["Bomeni", "Mahoo", "Mboghoni", "Mata", "Challa"] },
            { name: "Wundanyi", wards: ["Wundanyi/Mbale", "Werugha", "Mghange/Mwanda", "Wumingu/Kishushe"] },
            { name: "Mwatate", wards: ["Mwatate", "Chawia", "Rong'e", "Bura", "Wusi/Kishamba"] },
            { name: "Voi", wards: ["Mbololo", "Kaloleni", "Ngolia", "Sagala", "Kasigau", "Marungu"] }
        ]
    },
    {
        name: "Garissa",
        constituencies: [
            { name: "Garissa Township", wards: ["Waberi", "Galbet", "Township", "Iftin"] },
            { name: "Balambala", wards: ["Balambala", "Sankuri", "Saka", "Jarajara", "Danyere"] },
            { name: "Lagdera", wards: ["Goreale", "Baraki", "Maalamin", "Sabena", "Modogashe", "Bananey"] },
            { name: "Dadaab", wards: ["Dertu", "Dadaab", "Labasigale", "Damajale", "Abakaile"] },
            { name: "Fafi", wards: ["Nanighi", "Fafi", "Bura", "Dekaharia", "Jarajila"] },
            { name: "Ijara", wards: ["Ijara", "Masalani", "Hulugho", "Sangailu"] }
        ]
    },
    {
        name: "Wajir",
        constituencies: [
            { name: "Wajir North", wards: ["Batalu", "Bute", "Danaba", "Godoma", "Gurar", "Korondile", "Malkagufu"] },
            { name: "Wajir East", wards: ["Barwaqo", "Khorof Hara", "Township", "Wagberi"] },
            { name: "Tarbaj", wards: ["Elben", "Sarman", "Tarbaj", "Wargadud"] },
            { name: "Wajir West", wards: ["Adamasajide", "Arbajahan", "Hadado/Athibohol", "Wagalla/Ganyure"] },
            { name: "Eldas", wards: ["Della", "Eldas", "Elnur/TulaTula", "Lakoley South/Basir"] },
            { name: "Wajir South", wards: ["Benane", "Burder", "Dadaja Bulla", "Diif", "Habaswein", "Ibrahim Ure", "Lagboqol South"] }
        ]
    },
    {
        name: "Mandera",
        constituencies: [
            { name: "Mandera West", wards: ["Takaba South", "Takaba", "Lagsure", "Dandu", "Gither"] },
            { name: "Banissa", wards: ["Banissa", "Derkhale", "Guba", "Malkamari", "Kiliwehiri"] },
            { name: "Mandera North", wards: ["Ashabito", "Guticha", "Marothile", "Rhamu", "Rhamu Dimtu"] },
            { name: "Mandera South", wards: ["Wargadou", "Kutulo", "Elwak South", "Elwak North", "Shimbir Fatuma"] },
            { name: "Mandera East", wards: ["Arabia", "Libehia", "Khalalio", "Neboi", "Township"] },
            { name: "Lafey", wards: ["Sala", "Fino", "Lafey", "Waranqara", "Alango Gof"] }
        ]
    },
    {
        name: "Marsabit",
        constituencies: [
            { name: "Moyale", wards: ["Butiye", "Sololo", "Heillu/Manyatta", "Golbo", "Moyale Township", "Uran", "Obbu"] },
            { name: "North Horr", wards: ["Dukana", "Maikona", "North Horr", "Turbi", "Ileret"] },
            { name: "Saku", wards: ["Marsabit Central", "Karare", "Sagante/Jaldessa"] },
            { name: "Laisamis", wards: ["Laisamis", "Korr/Ngurunit", "Loglogo", "Kargi/South Horr"] }
        ]
    },
    {
        name: "Isiolo",
        constituencies: [
            { name: "Isiolo North", wards: ["Wabera", "Bulapesa", "Chari", "Cherab", "Ngaremara", "Burat", "Oldonyiro"] },
            { name: "Isiolo South", wards: ["Kinna", "Garba Tulla", "Sericho"] }
        ]
    },
    {
        name: "Meru",
        constituencies: [
            { name: "Igembe South", wards: ["Akachiu", "Athiru Gaiti", "Kanuni", "Kegoi/Antubochiu", "Maua"] },
            { name: "Igembe Central", wards: ["Akirang'ondu", "Athiru Ruujine", "Igembe East", "Kangeta", "Njia"] },
            { name: "Igembe North", wards: ["Amwathi", "Antuambui", "Antubetwe Kiongo", "Naathui", "Ntunene"] },
            { name: "Tigania West", wards: ["Akithi", "Athwana", "Kianjai", "Mbeu", "Nkomo"] },
            { name: "Tigania East", wards: ["Karama", "Kiguchwa", "Mikinduri", "Mithara", "Thangatha"] },
            { name: "North Imenti", wards: ["Municipality", "Ntima East", "Ntima West", "Nyaki East", "Nyaki West"] },
            { name: "Buuri", wards: ["Kibirichia", "Kiirua/Naari", "Kisima", "Ruiri/Rwarera", "Timau"] },
            { name: "Central Imenti", wards: ["Abothuguchi Central", "Abothuguchi West", "Kiagu", "Mwanganthia"] },
            { name: "South Imenti", wards: ["Abogeta East", "Abogeta West", "Igoji East", "Igoji West", "Mitunguu", "Nkuene"] }
        ]
    },
    {
        name: "Tharaka-Nithi",
        constituencies: [
            { name: "Maara", wards: ["Mitheru", "Muthambi", "Ganga", "Chogoria", "Mwimbi"] },
            { name: "Chuka/Igambang'ombe", wards: ["Magumoni", "Igambang'ombe", "Mugwe", "Mariani", "Karingani"] },
            { name: "Tharaka", wards: ["Mukothima", "Chiakariga", "Nkondi", "Marimanti", "Gatunga"] }
        ]
    },
    {
        name: "Embu",
        constituencies: [
            { name: "Manyatta", wards: ["Ruguru/Ngandori", "Kithimu", "Nginda", "Mbeti North", "Kirimari", "Gaturi South"] },
            { name: "Runyenjes", wards: ["Gaturi North", "Kagaari South", "Kagaari North", "Central", "Kyeni North", "Kyeni South"] },
            { name: "Mbeere North", wards: ["Nthawa", "Muminji", "Evurore"] },
            { name: "Mbeere South", wards: ["Mwea", "Makima", "Mbeti South", "Mavuria", "Kiambere"] }
        ]
    },
    {
        name: "Kitui",
        constituencies: [
            { name: "Mwingi North", wards: ["Ngomeni", "Kyuso", "Mumoni", "Tseikuru", "Tharaka"] },
            { name: "Mwingi West", wards: ["Kyome/Thaana", "Nguutani", "Migwani", "Kiomo/Kyethani"] },
            { name: "Mwingi Central", wards: ["Central", "Kivou", "Nguni", "Nuu", "Mui", "Waita"] },
            { name: "Kitui West", wards: ["Mutonguni", "Kauwi", "Matinyani", "Kwamutonga/Kithumula"] },
            { name: "Kitui Rural", wards: ["Kisasi", "Mbitini", "Kanyangi", "Kwa Vonza/Yatta"] },
            { name: "Kitui Central", wards: ["Miambani", "Township", "Kyangwithya West", "Mulango", "Kyangwithya East"] },
            { name: "Kitui East", wards: ["Zombe/Mwitika", "Nzambani", "Chuluni", "Voo/Kyamatu", "Endau/Malalani", "Mutito/Kaliku"] },
            { name: "Kitui South", wards: ["Ikanga/Kyatune", "Mutomo", "Mutha", "Ikutha/Kasaala", "Kanziko", "Athi"] }
        ]
    },
    {
        name: "Machakos",
        constituencies: [
            { name: "Masinga", wards: ["Kivaa", "Masinga Central", "Ekalakala", "Muthesya", "Ndithini"] },
            { name: "Yatta", wards: ["Ndalani", "Matuu", "Kithimani", "Ikomba", "Katangi"] },
            { name: "Kangundo", wards: ["Kangundo North", "Kangundo Central", "Kangundo East", "Kangundo West"] },
            { name: "Matungulu", wards: ["Tala", "Matungulu North", "Matungulu East", "Matungulu West", "Kyeleni"] },
            { name: "Kathiani", wards: ["Mitaboni", "Kathiani Central", "Upper Kaewa/Iveti", "Lower Kaewa/Kaani"] },
            { name: "Mavoko", wards: ["Athi River", "Kinanie", "Muthwani", "Syokimau/Mulolongo"] },
            { name: "Machakos Town", wards: ["Kalama", "Mua", "Mutitini", "Machakos Central", "Mumbuni North", "Muvuti/Kiima-Kimwe", "Kola"] },
            { name: "Mwala", wards: ["Mbiuni", "Makutano/Mwala", "Masii", "Muthetheni", "Wamunyu", "Kibauni"] }
        ]
    },
    {
        name: "Makueni",
        constituencies: [
            { name: "Mbooni", wards: ["Tulimani", "Mbooni", "Kithungo/Kitundu", "Kisau/Kiteta", "Kako/Waia", "Kalawa"] },
            { name: "Kilome", wards: ["Kiima Kiu/Kalanzoni", "Mukaa", "Kasikeu"] },
            { name: "Kaiti", wards: ["Kee", "Kilungu", "Ilima", "Ukia"] },
            { name: "Makueni", wards: ["Wote", "Muvau/Kikumini", "Mavindini", "Kitise/Kithuki", "Kathonzweni", "Nzaui/Kalamba", "Mbitini"] },
            { name: "Kibwezi West", wards: ["Makindu", "Kikumbulyu North", "Kikumbulyu South", "Nguumo", "Nguu/Masumba", "Emali/Mulala"] },
            { name: "Kibwezi East", wards: ["Masongaleni", "Mtito Andei", "Thange", "Ivingoni"] }
        ]
    },
    {
        name: "Nyandarua",
        constituencies: [
            { name: "Kinangop", wards: ["Engineer", "Gathara", "North Kinangop", "Murungaru", "Njabini/Kibiru", "Nyakio", "Magumu", "Githabai"] },
            { name: "Kipipiri", wards: ["Wanjohi", "Kipipiri", "Geta", "Githioro"] },
            { name: "Ol Kalou", wards: ["Karau", "Kanjuiri Ridge", "Mirangine", "Kaimbaga", "Rurii"] },
            { name: "Ol Joro Orok", wards: ["Gathanji", "Gatimu", "Weru", "Charagita"] },
            { name: "Ndaragwa", wards: ["Leshau/Pondo", "Kiriita", "Central", "Shamata"] }
        ]
    },
    {
        name: "Nyeri",
        constituencies: [
            { name: "Kieni", wards: ["Mweiga", "Naromoru Kiamathaga", "Mwiyogo/Endarasha", "Mugunda", "Gatarakwa", "Thegu River", "Kabaru", "Gakawa"] },
            { name: "Mathira", wards: ["Karatina Town", "Kirimukuyu", "Iriaini", "Ruguru", "Konyu", "Magutu"] },
            { name: "Mukurweini", wards: ["Mukurwe-ini Central", "Mukurwe-ini West", "Rugi", "Gikondi"] },
            { name: "Nyeri Town", wards: ["Kiganjo/Mathari", "Rware", "Gatitu/Muruguru", "Ruringu", "Kamakwa/Mukaro"] },
            { name: "Othaya", wards: ["Chinga", "Iria-ini", "Karima", "Mahiga"] },
            { name: "Tetu", wards: ["Dedan Kimathi", "Wamagana", "Aguthi-Gaaki"] }
        ]
    },
    {
        name: "Kirinyaga",
        constituencies: [
            { name: "Mwea", wards: ["Gathigiriri", "Kangai", "Murinduko", "Mutithi", "Nyangati", "Tebere", "Thiba", "Wamumu"] },
            { name: "Gichugu", wards: ["Kabare", "Baragwi", "Njukiini", "Ngariama", "Karumandi"] },
            { name: "Ndia", wards: ["Mukure", "Kiine", "Kariti"] },
            { name: "Kirinyaga Central", wards: ["Mutira", "Kanyekini", "Kerugoya", "Inoi"] }
        ]
    },
    {
        name: "Murang'a",
        constituencies: [
            { name: "Kiharu", wards: ["Wangu", "Mugoiri", "Mbiri", "Township", "Murarandia", "Gaturi"] },
            { name: "Maragwa", wards: ["Kimorori/Wempa", "Makuyu", "Kambiti", "Kamahuha", "Ichagaki", "Nginda"] },
            { name: "Kandara", wards: ["Ng'araria", "Muruka", "Kagundu-ini", "Gaichanjiru", "Ithiru", "Ruchu"] },
            { name: "Gatanga", wards: ["Ithanga", "Kakuzi/Mitubiri", "Mugumo-Ini", "Kihumbu-Ini", "Gatanga", "Kariara"] },
            { name: "Kigumo", wards: ["Kahumbu", "Muthithi", "Kigumo", "Kangari", "Kinyona"] },
            { name: "Kangema", wards: ["Rwathia", "Kanyenyaini", "Muguru"] },
            { name: "Mathioya", wards: ["Kiru", "Kamacharia", "Gitugi"] }
        ]
    },
    {
        name: "Kiambu",
        constituencies: [
            { name: "Gatundu North", wards: ["Gituamba", "Githobokoni", "Chania", "Mang'u"] },
            { name: "Gatundu South", wards: ["Kiamwangi", "Kiganjo", "Ndarugo", "Ngenda"] },
            { name: "Githunguri", wards: ["Githunguri", "Githiga", "Ikinu", "Ngewa", "Komothai"] },
            { name: "Juja", wards: ["Murera", "Theta", "Juja", "Witeithie", "Kalimoni"] },
            { name: "Kabete", wards: ["Gitaru", "Muguga", "Nyathuna", "Kabete", "Uthiru"] },
            { name: "Kiambaa", wards: ["Cianda", "Karuri", "Ndenderu", "Muchatha", "Kihara"] },
            { name: "Kiambu", wards: ["Ting'ang'a", "Ndumberi", "Riabai", "Township"] },
            { name: "Kikuyu", wards: ["Karai", "Nachu", "Sigona", "Kikuyu", "Kinoo"] },
            { name: "Lari", wards: ["Kinale", "Kijabe", "Nyanduma", "Kamburu", "Lari/Kirenga"] },
            { name: "Limuru", wards: ["Bibirioni", "Limuru Central", "Ndeiya", "Limuru East", "Ngecha/Tigoni"] },
            { name: "Ruiru", wards: ["Gitothua", "Biashara", "Gatongora", "Kahawa/Sukari", "Kahawa Wendani", "Kiuu", "Mwiki", "Mwihoko"] },
            { name: "Thika Town", wards: ["Township", "Kamenu", "Hospital", "Gatuanyaga", "Ngoliba"] }
        ]
    },
    {
        name: "Turkana",
        constituencies: [
            { name: "Turkana North", wards: ["Kaeris", "Lake Zone", "Lapur", "Kaaleng/Kaikor", "Kibish", "Nakalale"] },
            { name: "Turkana West", wards: ["Kakuma", "Lopur", "Letea", "Songot", "Kalobeyei", "Lokichoggio", "Nanam"] },
            { name: "Turkana Central", wards: ["Kerio Delta", "Kang'atotha", "Kalokol", "Lodwar Township", "Kanamkemer"] },
            { name: "Loima", wards: ["Kotaruk/Lobei", "Turkwel", "Loima", "Lokiriama/Lorengippi"] },
            { name: "Turkana South", wards: ["Kaputir", "Katilu", "Lobokat", "Kalapata", "Lokichar"] },
            { name: "Turkana East", wards: ["Kapedo/Napeito", "Katilia", "Lokori/Kochodin"] }
        ]
    },
    {
        name: "West Pokot",
        constituencies: [
            { name: "Kapenguria", wards: ["Kapenguria", "Mnagei", "Siyoi", "Riwo", "Endugh", "Sook"] },
            { name: "Sigor", wards: ["Sekerr", "Masol", "Lomut", "Weiwei"] },
            { name: "Kacheliba", wards: ["Suam", "Kodich", "Kasei", "Kapchok", "Kiwawa", "Alale"] },
            { name: "Pokot South", wards: ["Chepareria", "Batei", "Tapach", "Lelan"] }
        ]
    },
    {
        name: "Samburu",
        constituencies: [
            { name: "Samburu West", wards: ["Lodokejek", "Loosuk", "Maralal", "Marmar", "Poro", "Suguta"] },
            { name: "Samburu North", wards: ["Angata", "Baawa", "El Barta", "Nachola", "Ndoto", "Nyiro"] },
            { name: "Samburu East", wards: ["Wamba East", "Wamba West", "Wamba North", "Waso"] }
        ]
    },
    {
        name: "Trans Nzoia",
        constituencies: [
            { name: "Kwanza", wards: ["Kwanza", "Keiyo", "Bidii", "Kapomboi"] },
            { name: "Endebess", wards: ["Endebess", "Matumbei", "Chepchoina"] },
            { name: "Saboti", wards: ["Kinyoro", "Matisi", "Tuwan", "Saboti", "Machewa"] },
            { name: "Kiminini", wards: ["Kiminini", "Waitaluk", "Sirende", "Hospital", "Sikhendu", "Nabiswa"] },
            { name: "Cherangany", wards: ["Motosiet", "Sitatunga", "Kaplamai", "Makutano", "Sinyereri", "Cherangany-Suwerwa", "Chepsiro-Kiptoror"] }
        ]
    },
    {
        name: "Uasin Gishu",
        constituencies: [
            { name: "Soy", wards: ["Moi's Bridge", "Kapkures", "Ziwa", "Segero/Barsombe", "Kipsom Ba", "Soy", "Kuinet/Kapsuswa"] },
            { name: "Turbo", wards: ["Ngenyilel", "Tapsagoi", "Kamagut", "Kiplombe", "Kapsaos", "Huruma"] },
            { name: "Moiben", wards: ["Tembelio", "Sergoit", "Karuna/Meibeki", "Moiben", "Kimumu"] },
            { name: "Kapseret", wards: ["Simat/Kapseret", "Kipkenyo", "Ngeria", "Megun", "Langas"] },
            { name: "Kesses", wards: ["Racecourse", "Cheptiret/Kipchamo", "Tulwet/Chuiyat", "Tarakwa"] },
            { name: "Ainabkoi", wards: ["Kapsoya", "Kaptagat", "Ainabkoi/Olare"] }
        ]
    },
    {
        name: "Elgeyo-Marakwet",
        constituencies: [
            { name: "Marakwet East", wards: ["Kapyego", "Sambirir", "Endo", "Embobut/Embulot"] },
            { name: "Marakwet West", wards: ["Kapsowar", "Lelan", "Sengwer", "Cherang'any/Chebororwa", "Moiben/Kuserwo", "Arror"] },
            { name: "Keiyo North", wards: ["Emsoo", "Kamariny", "Kapchemutwa", "Tambach"] },
            { name: "Keiyo South", wards: ["Kaptarakwa", "Chepkorio", "Soy North", "Soy South", "Kabiemit", "Metkei"] }
        ]
    },
    {
        name: "Nandi",
        constituencies: [
            { name: "Tinderet", wards: ["Songhor/Soba", "Tinderet", "Chemelil/Chemase", "Kapsimotwo"] },
            { name: "Aldai", wards: ["Kabwareng", "Terik", "Kemeloi-Maraba", "Kobujoi", "Kaptumo-Kaboi", "Koyo-Ndurio"] },
            { name: "Nandi Hills", wards: ["Nandi Hills", "Chepkunyuk", "Ol'lessos", "Kapchorua"] },
            { name: "Chesumei", wards: ["Chemundu/Kapng'etuny", "Kosirai", "Lelmokwo/Ngechek", "Kaptel/Kamoiywo", "Kiptuya"] },
            { name: "Emgwen", wards: ["Chepkumia", "Kapkangani", "Kapsabet", "Kilibwoni"] },
            { name: "Mosop", wards: ["Chepterwai", "Kipkaren", "Kurgung/Surungai", "Kabiyet", "Ndalat", "Kabisaga", "Sangalo/Kebulonik"] }
        ]
    },
    {
        name: "Baringo",
        constituencies: [
            { name: "Tiaty", wards: ["Tirioko", "Kolowa", "Ribkwo", "Silale", "Loiyamorock", "Tangulbei/Korossi", "Churo/Amaya"] },
            { name: "Baringo North", wards: ["Barwesa", "Kabartonjo", "Saimo Kipsaraman", "Saimo Soi", "Bartabwa"] },
            { name: "Baringo Central", wards: ["Kabarnet", "Sacho", "Tenges", "Ewalel", "Kapropita"] },
            { name: "Baringo South", wards: ["Marigat", "Ilchamus", "Mochongoi", "Mukutani"] },
            { name: "Mogotio", wards: ["Mogotio", "Emining", "Kisanana"] },
            { name: "Eldama Ravine", wards: ["Lembus Perkerra", "Mumberes/Maji Mazuri", "Ravine Town", "Lembus Mosop", "Koibatek", "Lembus Kwen"] }
        ]
    },
    {
        name: "Laikipia",
        constituencies: [
            { name: "Laikipia West", wards: ["Ol-Moran", "Rumuruti Township", "Githiga", "Marmanet", "Igwamiti", "Salama"] },
            { name: "Laikipia East", wards: ["Ngobit", "Tigithi", "Thingithu", "Nanyuki", "Umande"] },
            { name: "Laikipia North", wards: ["Sosian", "Segera", "Mugogodo West", "Mugogodo East"] }
        ]
    },
    {
        name: "Narok",
        constituencies: [
            { name: "Kilgoris", wards: ["Kilgoris Central", "Keyian", "Angata Barikoi", "Shankoe", "Kimintet", "Lolgorian"] },
            { name: "Emurua Dikirr", wards: ["Ilkerin", "Ololmasani", "Mogondo", "Kapsasian"] },
            { name: "Narok North", wards: ["Nkareta", "Olokurto", "Olpusimoru", "Olorropil", "Town", "Melili"] },
            { name: "Narok East", wards: ["Mosiro", "Ildamat", "Keekonyokie", "Suswa"] },
            { name: "Narok South", wards: ["Loita", "Maji-moto/Naroosura", "Ololulunga", "Melelo", "Sogoo", "Sagamian"] },
            { name: "Narok West", wards: ["Ilmotiok", "Siana", "Mara", "Naikarra"] }
        ]
    },
    {
        name: "Kajiado",
        constituencies: [
            { name: "Kajiado Central", wards: ["Purko", "Ildamat", "Dalalekutuk", "Matapato North", "Matapato South"] },
            { name: "Kajiado North", wards: ["Olkeri", "Ongata Rongai", "Nkaimurunya", "Oloolua", "Ngong"] },
            { name: "Kajiado East", wards: ["Kaputiei North", "Kitengela", "Oloosirkon/Sholinke", "Kenyawa-Poka", "Imaroro"] },
            { name: "Kajiado West", wards: ["Keekonyokie", "Iloodokilani", "Magadi", "Ewuaso Oonkidong'i", "Mosiro"] },
            { name: "Kajiado South", wards: ["Entonet/Lenkisi", "Mbirikani/Eselenkei", "Keikuku", "Rombo", "Kimana"] }
        ]
    },
    {
        name: "Kericho",
        constituencies: [
            { name: "Kipkelion East", wards: ["Tendeno/Sorget", "Londiani", "Kedowa/Kimugul", "Chepseon"] },
            { name: "Kipkelion West", wards: ["Kipkelion", "Chilchila", "Kamasian", "Kunyak"] },
            { name: "Ainamoi", wards: ["Kapsoit", "Ainamoi", "Kipchebor", "Kapkugerwet", "Kipchimchim", "Kapsaos"] },
            { name: "Bureti", wards: ["Kisiara", "Tebesonik", "Cheboin", "Chemosot", "Litein", "Cheplanget", "Kapkatet"] },
            { name: "Belgut", wards: ["Kabianga", "Waldai", "Chaik", "Seretut/Cheptororiet", "Kapsuser"] },
            { name: "Sigowet/Soin", wards: ["Sigowet", "Kaplelartet", "Soliat", "Soin"] }
        ]
    },
    {
        name: "Bomet",
        constituencies: [
            { name: "Sotik", wards: ["Ndanai/Abosi", "Chemagel", "Kapletundo", "Kipsonoi", "Rongena/Manaret"] },
            { name: "Chepalungu", wards: ["Kong'asis", "Nyangores", "Siongiroi", "Sigor", "Chebunyo"] },
            { name: "Bomet East", wards: ["Merigi", "Kembu", "Longisa", "Kipreres", "Chemaner"] },
            { name: "Bomet Central", wards: ["Siliibwet Township", "Ndaraweta", "Singorwet", "Chesoen", "Mutarakwa"] },
            { name: "Konoin", wards: ["Chepchabas", "Kimulot", "Mogogosiek", "Boito", "Embomos"] }
        ]
    },
    {
        name: "Kakamega",
        constituencies: [
            { name: "Lugari", wards: ["Mautuma", "Lugari", "Lumakanda", "Chekalini", "Chemaywa", "Lawandeti"] },
            { name: "Likuyani", wards: ["Likuyani", "Sango", "Kongoni", "Nzoia", "Sinoko"] },
            { name: "Malava", wards: ["West Kabras", "Chemuche East", "East Kabras", "Butali/Chegulo", "Manda-Shivanga", "Shirugu-Mugai", "South Kabras"] },
            { name: "Lurambi", wards: ["Butsotso Central", "Butsotso East", "Butsotso South", "Sheywe", "Mahiakalo", "Shirere"] },
            { name: "Navakholo", wards: ["Bunyala West", "Bunyala Central", "Bunyala East", "Shinoyi-Shikomari-Esumeyia", "Ingotse-Matiha"] },
            { name: "Mumias West", wards: ["Mumias Central", "Mumias North", "Etenje", "Musanda"] },
            { name: "Mumias East", wards: ["Lusheya/Lubinu", "Malaha/Isongo/Makunga", "East Wanga"] },
            { name: "Matungu", wards: ["Koyonzo", "Kholera", "Khalaba", "Mayoni", "Namamali"] },
            { name: "Butere", wards: ["Marama Central", "Marama North", "Marama South", "Marama West", "Marenyo - Shianda"] },
            { name: "Khwisero", wards: ["Kisa North", "Kisa East", "Kisa West", "Kisa Central"] },
            { name: "Shinyalu", wards: ["Isukha North", "Murhanda", "Isukha South", "Isukha Central", "Isukha East", "Isukha West"] },
            { name: "Ikolomani", wards: ["Idakho North", "Idakho Central", "Idakho South", "Idakho East"] }
        ]
    },
    {
        name: "Vihiga",
        constituencies: [
            { name: "Vihiga", wards: ["Lugaga-Wamuluma", "South Maragoli", "Central Maragoli", "Mungoma"] },
            { name: "Sabatia", wards: ["Lyaaduywa/Izava", "West Sabatia", "Chavakali", "North Maragoli", "Wodanga", "Busali"] },
            { name: "Hamisi", wards: ["Shiru", "Gisambai", "Shamakhokho", "Banja", "Muhudi", "Tambaa", "Jepkoyao"] },
            { name: "Luanda", wards: ["Luanda Township", "Wemilabi", "Mwibona", "Luanda South", "Emabungo"] },
            { name: "Emuhaya", wards: ["North East Bunyore", "Central Bunyore", "West Bunyore"] }
        ]
    },
    {
        name: "Bungoma",
        constituencies: [
            { name: "Mt. Elgon", wards: ["Cheptais", "Chesikaki", "Chepyuk", "Kapkateny", "Kaptama", "Elgon"] },
            { name: "Sirisia", wards: ["Namwela", "Malakisi/South Kulisuru", "Lwandanyi"] },
            { name: "Kabuchai", wards: ["Kabuchai/Chwele", "West Nalondo", "Bwake/Luuya", "Mukuyuni", "South Bukusu"] },
            { name: "Kanduyi", wards: ["Bukembe West", "Bukembe East", "Township", "Khalaba", "Musikoma", "East Sang'alo", "Tuuti/Marakaru", "West Sang'alo"] },
            { name: "Bumula", wards: ["Bumula", "Khasoko", "Kabula", "Kimaeti", "South Bukusu", "Siboti", "West Bukusu"] },
            { name: "Webuye East", wards: ["Mihuu", "Ndivisi", "Maraka"] },
            { name: "Webuye West", wards: ["Sitikho", "Matulo", "Bokoli", "Misikhu"] },
            { name: "Kimilili", wards: ["Kibingei", "Kimilili", "Maeni", "Kamukuywa"] },
            { name: "Tongaren", wards: ["Mbakalo", "Naitiri/Kabuyefwe", "Milima", "Ndalu/Tabani", "Tongaren", "Soysambu/Mitua"] }
        ]
    },
    {
        name: "Busia",
        constituencies: [
            { name: "Teso North", wards: ["Malaba Central", "Malaba South", "Ang'urai North", "Ang'urai South", "Malaba North", "Ang'urai East"] },
            { name: "Teso South", wards: ["Chakol South", "Ang'orom", "Amukura Central", "Amukura East", "Chakol North", "Amukura West"] },
            { name: "Nambale", wards: ["Nambale Township", "Bukhayo East", "Bukhayo North/Walatsi", "Bukhayo Central"] },
            { name: "Matayos", wards: ["Burumba", "Bukhayo West", "Matayos South", "Mayenje", "Busibwabo"] },
            { name: "Butula", wards: ["Marachi North", "Marachi West", "Marachi Central", "Marachi East", "Elugulu", "Kingandole"] },
            { name: "Funyula", wards: ["Namboboto/Nambuku", "Nangina", "Ageng'a Nanguba", "Bwiri"] },
            { name: "Budalangi", wards: ["Bunyala West", "Bunyala North", "Bunyala South", "Bunyala Central"] }
        ]
    },
    {
        name: "Siaya",
        constituencies: [
            { name: "Ugenya", wards: ["East Ugenya", "West Ugenya", "North Ugenya", "Ukwala"] },
            { name: "Ugunja", wards: ["Sidindi", "Sigomere", "Ugunja"] },
            { name: "Alego Usonga", wards: ["North Alego", "West Alego", "Siaya Township", "Central Alego", "South East Alego", "Usonga"] },
            { name: "Gem", wards: ["North Gem", "West Gem", "Central Gem", "Yala Township", "East Gem", "South Gem"] },
            { name: "Bondo", wards: ["West Yimbo", "Central Sakwa", "South Sakwa", "Yimbo East", "West Sakwa", "North Sakwa"] },
            { name: "Rarieda", wards: ["East Asembo", "West Asembo", "North Uyoma", "South Uyoma", "West Uyoma"] }
        ]
    },
    {
        name: "Kisumu",
        constituencies: [
            { name: "Kisumu West", wards: ["Central Kisumu", "West Kisumu", "North Kisumu", "South West Kisumu", "North West Kisumu"] },
            { name: "Kisumu Central", wards: ["Railways", "Migosi", "Shaurimoyo Kaloleni", "Market Milimani", "Kondele", "Nyalenda B"] },
            { name: "Kisumu East", wards: ["Kajulu", "Kolwa East", "Manyatta B", "Nyalenda A", "Kolwa Central"] },
            { name: "Seme", wards: ["West Seme", "Central Seme", "East Seme", "North Seme"] },
            { name: "Muhoroni", wards: ["Miwania", "Ombeyi", "Masogo/Nyang'oma", "Chemelil", "Muhoroni/Koru"] },
            { name: "Nyando", wards: ["East Kano/Wawidhi", "Awasi/Onjiko", "Ahero", "Kabonyo/Kanyagwal", "Kobura"] },
            { name: "Nyakach", wards: ["South East Nyakach", "West Nyakach", "North Nyakach", "Central Nyakach", "South West Nyakach"] }
        ]
    },
    {
        name: "Homa Bay",
        constituencies: [
            { name: "Kasipul", wards: ["Central Kasipul", "East Kamagak", "South Kasipul", "West Kamagak", "West Kasipul"] },
            { name: "Kabondo Kasipul", wards: ["Kabondo East", "Kabondo West", "Kojwach", "Kokwanyo/Kakelo"] },
            { name: "Karachuonyo", wards: ["Central Karachuonyo", "Kanyaluo", "Kendu Bay Town", "Kibiri", "North Karachuonyo", "Wang'chieng", "West Karachuonyo"] },
            { name: "Rangwe", wards: ["Gem East", "Gem West", "Kagan", "Kochia"] },
            { name: "Homa Bay Town", wards: ["Homa Bay Central", "Homa Bay Arujo", "Homa Bay West", "Homa Bay East"] },
            { name: "Ndhiwa", wards: ["Kabuoch North", "Kabuoch South/Pala", "Kanyadoto", "Kanyamwa Kologi", "Kanyamwa Kosewe", "Kanyikela", "Kwabwai"] },
            { name: "Suba North", wards: ["Gembe", "Kasgunga", "Lambwe", "Mfangano Island", "Rusinga Island"] },
            { name: "Suba South", wards: ["Gwassi North", "Gwassi South", "Kaksingri West", "Ruma Kaksingri"] }
        ]
    },
    {
        name: "Migori",
        constituencies: [
            { name: "Rongo", wards: ["North Kamagambo", "Central Kamagambo", "East Kamagambo", "South Kamagambo"] },
            { name: "Awendo", wards: ["North Sakwa", "South Sakwa", "West Sakwa", "Central Sakwa"] },
            { name: "Suna East", wards: ["God Jope", "Suna Central", "Kakrao", "Kwa"] },
            { name: "Suna West", wards: ["Wiga", "Wasweta II", "Ragana-Oruba", "Wasimbete"] },
            { name: "Uriri", wards: ["West Kanyamkago", "North Kanyamkago", "Central Kanyamkago", "South Kanyamkago", "East Kanyamkago"] },
            { name: "Nyatike", wards: ["Kachieng'", "Kanyasa", "North Kadem", "Macalder/Kanyarwanda", "Kaler", "Got Kachola", "Muhuru"] },
            { name: "Kuria West", wards: ["Bukira East", "Bukira Central/Ikerege", "Isibania", "Makerero", "Masaba", "Tagare", "Nyamosense/Komosoko"] },
            { name: "Kuria East", wards: ["Gokeharaka/Getambwega", "Ntimaru West", "Ntimaru East", "Nyabasi East", "Nyabasi West"] }
        ]
    },
    {
        name: "Kisii",
        constituencies: [
            { name: "Bonchari", wards: ["Bomariba", "Bogiakumu", "Bokeira", "Riana"] },
            { name: "South Mugirango", wards: ["Bogetenga", "Borabu/Chitago", "Moticho", "Getenga", "Tabaka", "Boikanga"] },
            { name: "Bomachoge Borabu", wards: ["Borabu Masaba", "Boochi Borabu", "Bokimonge", "Magenche"] },
            { name: "Bobasi", wards: ["Masige West", "Masige East", "Bassi Central", "Nyamache", "Bassi Bogetaorio", "Bobasi Chache", "Sameta", "Mwamonari"] },
            { name: "Bomachoge Chache", wards: ["Central Kitutu", "Majoge Basi", "Boikang'a"] },
            { name: "Nyaribari Masaba", wards: ["Ichuni", "Bobaracho", "Kiamokama", "Gesusu", "Masimba"] },
            { name: "Nyaribari Chache", wards: ["Bobasi", "Kisii Central", "Kegochi", "Karianda", "Mosocho", "Bogiakumu"] },
            { name: "Kitutu Chache North", wards: ["Manga", "Marani", "Sensi", "Mwamonari"] },
            { name: "Kitutu Chache South", wards: ["Bogusero", "Nyakoe", "Kitutu Central", "Nyatiko", "Manyatta"] }
        ]
    },
    {
        name: "Nyamira",
        constituencies: [
            { name: "Kitutu Masaba", wards: ["Rigoma", "Gachuba", "Kemera", "Magombo", "Manga", "Gesima"] },
            { name: "West Mugirango", wards: ["Nyamaiya", "Bogichora", "Bosamaro", "Bonyamatuta", "Township"] },
            { name: "North Mugirango", wards: ["Itibo", "Bomwagamo", "Bokeira", "Magwagwa", "Ekerenyo"] },
            { name: "Borabu", wards: ["Esise", "Mekenene", "Kiabonyoru", "Nyansiongo"] }
        ]
    }
];

export const religions = [
    "Christian",
    "Muslim",
    "Hindu",
    "Traditional",
    "Other",
    "None",
    "Prefer not to say"
];

export const ethnicities = [
    "Kikuyu", "Luhya", "Kalenjin", "Luo", "Kamba", "Somali", "Kisii", "Mijikenda", "Meru", "Turkana", "Maasai", "Teso", "Embu", "Taita", "Kuria", "Other"
].sort();
