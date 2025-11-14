'use client'

import { useState, useMemo, useEffect } from 'react'
import { ChefHat, Search, Heart, Clock, Users, BookOpen, Sparkles, Star, Filter, X } from 'lucide-react'

type Recipe = {
  id: number
  title: string
  category: string
  prepTime: string
  servings: string
  difficulty: string
  ingredients: string[]
  instructions: string[]
  tips?: string
}

const recipes: Recipe[] = [
  // ENTRADAS (12 receitas)
  {
    id: 1,
    title: "Canapés de Salmão Defumado",
    category: "Entradas",
    prepTime: "20 min",
    servings: "20 unidades",
    difficulty: "Fácil",
    ingredients: [
      "200g de salmão defumado",
      "1 pacote de torradas redondas",
      "200g de cream cheese",
      "2 colheres de sopa de endro fresco",
      "Suco de 1 limão",
      "Alcaparras para decorar"
    ],
    instructions: [
      "Misture o cream cheese com endro picado e suco de limão",
      "Espalhe a mistura sobre as torradas",
      "Coloque fatias de salmão defumado por cima",
      "Decore com alcaparras e um raminho de endro",
      "Sirva imediatamente ou mantenha refrigerado"
    ],
    tips: "Prepare no máximo 2 horas antes de servir para manter as torradas crocantes."
  },
  {
    id: 2,
    title: "Bolinho de Bacalhau Tradicional",
    category: "Entradas",
    prepTime: "45 min",
    servings: "30 bolinhos",
    difficulty: "Médio",
    ingredients: [
      "500g de bacalhau dessalgado",
      "4 batatas médias",
      "2 ovos",
      "1 cebola picada",
      "Salsa e cebolinha a gosto",
      "Óleo para fritar"
    ],
    instructions: [
      "Cozinhe o bacalhau e desfie bem fino",
      "Cozinhe as batatas e amasse",
      "Misture bacalhau, batata, ovos, cebola e temperos",
      "Faça bolinhas com a massa",
      "Frite em óleo quente até dourar",
      "Escorra em papel toalha"
    ],
    tips: "Congele os bolinhos crus e frite direto do freezer quando precisar."
  },
  {
    id: 3,
    title: "Bruschetta de Tomate e Manjericão",
    category: "Entradas",
    prepTime: "15 min",
    servings: "15 unidades",
    difficulty: "Fácil",
    ingredients: [
      "1 baguete fatiada",
      "4 tomates maduros picados",
      "1 maço de manjericão fresco",
      "3 dentes de alho",
      "Azeite extra virgem",
      "Sal e pimenta do reino"
    ],
    instructions: [
      "Torre as fatias de pão no forno",
      "Esfregue alho nas torradas ainda quentes",
      "Misture tomates picados com manjericão, azeite, sal e pimenta",
      "Coloque a mistura sobre as torradas",
      "Regue com um fio de azeite",
      "Sirva imediatamente"
    ]
  },
  {
    id: 4,
    title: "Tábua de Frios Natalina",
    category: "Entradas",
    prepTime: "30 min",
    servings: "10-12 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "200g de queijo brie",
      "200g de queijo gorgonzola",
      "200g de queijo prato",
      "150g de salame italiano",
      "150g de presunto cru",
      "Uvas verdes e roxas",
      "Nozes e castanhas",
      "Geleias variadas",
      "Torradas e crackers"
    ],
    instructions: [
      "Disponha os queijos em diferentes pontos da tábua",
      "Enrole o salame e presunto em formato de rosas",
      "Distribua as uvas em cachos",
      "Adicione nozes e castanhas em pequenos potes",
      "Coloque as geleias em potinhos",
      "Complete com torradas e crackers ao redor"
    ],
    tips: "Retire os queijos da geladeira 30 minutos antes de servir."
  },
  {
    id: 5,
    title: "Mini Quiches de Alho-Poró",
    category: "Entradas",
    prepTime: "40 min",
    servings: "24 unidades",
    difficulty: "Médio",
    ingredients: [
      "1 massa folhada pronta",
      "2 alhos-poró fatiados",
      "200ml de creme de leite",
      "3 ovos",
      "100g de queijo gruyère ralado",
      "Noz-moscada a gosto",
      "Sal e pimenta"
    ],
    instructions: [
      "Refogue o alho-poró até murchar",
      "Forre forminhas de empada com a massa folhada",
      "Misture ovos, creme de leite, queijo e temperos",
      "Distribua o alho-poró nas forminhas",
      "Cubra com a mistura de ovos",
      "Asse a 180°C por 25 minutos"
    ]
  },
  {
    id: 6,
    title: "Camarão ao Alho Flambado",
    category: "Entradas",
    prepTime: "25 min",
    servings: "6 pessoas",
    difficulty: "Médio",
    ingredients: [
      "500g de camarões grandes limpos",
      "6 dentes de alho picados",
      "100ml de vinho branco",
      "50ml de conhaque",
      "Manteiga",
      "Salsinha picada",
      "Sal e pimenta"
    ],
    instructions: [
      "Tempere os camarões com sal e pimenta",
      "Doure o alho na manteiga",
      "Adicione os camarões e refogue",
      "Adicione o vinho branco",
      "Flambe com o conhaque (cuidado!)",
      "Finalize com salsinha picada"
    ],
    tips: "Sirva com torradas ou arroz branco."
  },
  {
    id: 7,
    title: "Carpaccio de Carne com Rúcula",
    category: "Entradas",
    prepTime: "20 min",
    servings: "6 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "300g de filé mignon congelado",
      "Rúcula fresca",
      "Lascas de parmesão",
      "Alcaparras",
      "Azeite extra virgem",
      "Suco de limão",
      "Sal e pimenta do reino"
    ],
    instructions: [
      "Fatie a carne bem fina ainda semi-congelada",
      "Disponha as fatias em um prato",
      "Tempere com sal, pimenta, azeite e limão",
      "Cubra com rúcula fresca",
      "Adicione lascas de parmesão e alcaparras",
      "Sirva imediatamente"
    ]
  },
  {
    id: 8,
    title: "Crostini de Ricota e Mel",
    category: "Entradas",
    prepTime: "15 min",
    servings: "20 unidades",
    difficulty: "Fácil",
    ingredients: [
      "1 baguete fatiada",
      "250g de ricota fresca",
      "Mel de boa qualidade",
      "Nozes picadas",
      "Tomilho fresco",
      "Azeite"
    ],
    instructions: [
      "Torre as fatias de pão com um fio de azeite",
      "Espalhe a ricota sobre as torradas",
      "Regue com mel generosamente",
      "Polvilhe nozes picadas",
      "Decore com folhinhas de tomilho",
      "Sirva imediatamente"
    ]
  },
  {
    id: 9,
    title: "Empadas de Palmito",
    category: "Entradas",
    prepTime: "50 min",
    servings: "20 unidades",
    difficulty: "Médio",
    ingredients: [
      "Massa de empada pronta",
      "300g de palmito picado",
      "1 cebola picada",
      "2 tomates picados",
      "200ml de creme de leite",
      "Queijo parmesão ralado",
      "Cheiro-verde"
    ],
    instructions: [
      "Refogue cebola, tomate e palmito",
      "Adicione creme de leite e queijo",
      "Tempere com sal, pimenta e cheiro-verde",
      "Forre forminhas com a massa",
      "Recheie com o preparado",
      "Asse a 180°C por 30 minutos"
    ]
  },
  {
    id: 10,
    title: "Rolinhos Primavera",
    category: "Entradas",
    prepTime: "35 min",
    servings: "15 unidades",
    difficulty: "Médio",
    ingredients: [
      "Massa para rolinho primavera",
      "200g de carne moída",
      "Cenoura ralada",
      "Repolho picado",
      "Broto de feijão",
      "Molho shoyu",
      "Gengibre ralado",
      "Óleo para fritar"
    ],
    instructions: [
      "Refogue a carne com gengibre",
      "Adicione os vegetais e shoyu",
      "Deixe esfriar o recheio",
      "Recheie as massas e enrole bem",
      "Frite em óleo quente até dourar",
      "Sirva com molho agridoce"
    ]
  },
  {
    id: 11,
    title: "Patê de Atum Cremoso",
    category: "Entradas",
    prepTime: "10 min",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "2 latas de atum em água",
      "200g de cream cheese",
      "1 cebola pequena picada",
      "Suco de 1 limão",
      "Azeitonas picadas",
      "Salsinha",
      "Sal e pimenta"
    ],
    instructions: [
      "Escorra bem o atum",
      "Misture todos os ingredientes no processador",
      "Bata até obter um creme homogêneo",
      "Ajuste o sal e pimenta",
      "Leve à geladeira por 1 hora",
      "Sirva com torradas ou crackers"
    ]
  },
  {
    id: 12,
    title: "Cestinhas de Queijo com Geleia",
    category: "Entradas",
    prepTime: "25 min",
    servings: "18 unidades",
    difficulty: "Fácil",
    ingredients: [
      "1 massa folhada",
      "200g de queijo minas frescal",
      "Geleia de pimenta ou damasco",
      "Orégano",
      "Azeite"
    ],
    instructions: [
      "Corte círculos da massa folhada",
      "Forre forminhas de empada",
      "Coloque cubos de queijo",
      "Adicione uma colher de geleia",
      "Polvilhe orégano e regue com azeite",
      "Asse a 200°C por 15 minutos"
    ]
  },

  // PRATOS PRINCIPAIS (15 receitas)
  {
    id: 13,
    title: "Peru Assado Tradicional",
    category: "Pratos Principais",
    prepTime: "4 horas",
    servings: "12-15 pessoas",
    difficulty: "Difícil",
    ingredients: [
      "1 peru de 5-6kg",
      "200g de manteiga amolecida",
      "4 dentes de alho amassados",
      "Suco de 2 laranjas",
      "1 xícara de vinho branco",
      "Ervas finas (tomilho, alecrim, sálvia)",
      "Sal, pimenta e páprica",
      "Bacon para cobrir"
    ],
    instructions: [
      "Tempere o peru por dentro e por fora com sal, pimenta e alho",
      "Misture manteiga com ervas e passe por toda a pele",
      "Cubra o peito com fatias de bacon",
      "Coloque em assadeira com vinho e suco de laranja",
      "Asse a 180°C por 3-4 horas, regando a cada 30 minutos",
      "Deixe descansar 20 minutos antes de fatiar"
    ],
    tips: "Use termômetro de carne - temperatura interna deve atingir 75°C."
  },
  {
    id: 14,
    title: "Tender Glaceado com Abacaxi",
    category: "Pratos Principais",
    prepTime: "2 horas",
    servings: "10 pessoas",
    difficulty: "Médio",
    ingredients: [
      "1 tender de 3kg",
      "1 lata de abacaxi em calda",
      "1 xícara de açúcar mascavo",
      "1/2 xícara de mel",
      "Cravo da índia",
      "Mostarda",
      "Suco de 1 laranja"
    ],
    instructions: [
      "Retire o tender da embalagem e faça cortes em losango",
      "Espete cravos nos cruzamentos dos cortes",
      "Misture mel, açúcar mascavo, mostarda e suco de laranja",
      "Pincele o tender com a mistura",
      "Disponha rodelas de abacaxi com palitos",
      "Asse a 180°C por 1h30, regando a cada 20 minutos"
    ]
  },
  {
    id: 15,
    title: "Lombo Suíno ao Molho Madeira",
    category: "Pratos Principais",
    prepTime: "1h30",
    servings: "8 pessoas",
    difficulty: "Médio",
    ingredients: [
      "1,5kg de lombo suíno",
      "200ml de vinho Madeira",
      "200ml de creme de leite",
      "2 cebolas fatiadas",
      "Cogumelos frescos",
      "Manteiga",
      "Tomilho",
      "Sal e pimenta"
    ],
    instructions: [
      "Tempere o lombo e sele em todos os lados",
      "Retire e reserve",
      "Refogue cebolas e cogumelos na mesma panela",
      "Adicione o vinho Madeira e reduza",
      "Volte o lombo, adicione creme de leite e tomilho",
      "Cozinhe em fogo baixo por 40 minutos"
    ]
  },
  {
    id: 16,
    title: "Bacalhau à Gomes de Sá",
    category: "Pratos Principais",
    prepTime: "1h30",
    servings: "8 pessoas",
    difficulty: "Médio",
    ingredients: [
      "800g de bacalhau dessalgado",
      "1kg de batatas",
      "3 cebolas grandes fatiadas",
      "4 ovos cozidos",
      "Azeitonas pretas",
      "Azeite português",
      "Salsa picada",
      "Alho"
    ],
    instructions: [
      "Cozinhe o bacalhau e desfie em lascas",
      "Cozinhe as batatas e corte em rodelas",
      "Refogue as cebolas em bastante azeite",
      "Em refratário, faça camadas de batata, bacalhau e cebola",
      "Decore com ovos em rodelas e azeitonas",
      "Regue com azeite e asse por 20 minutos"
    ]
  },
  {
    id: 17,
    title: "Chester Recheado",
    category: "Pratos Principais",
    prepTime: "3 horas",
    servings: "10 pessoas",
    difficulty: "Médio",
    ingredients: [
      "1 chester de 3kg",
      "500g de farofa pronta",
      "200g de bacon picado",
      "Ameixa seca",
      "Damasco seco",
      "Manteiga",
      "Laranja",
      "Mel"
    ],
    instructions: [
      "Prepare a farofa com bacon, frutas secas e manteiga",
      "Recheie o chester com a farofa",
      "Feche com palitos ou linha culinária",
      "Pincele com mel e suco de laranja",
      "Cubra com papel alumínio",
      "Asse a 180°C por 2h30, descobrindo nos últimos 30 minutos"
    ]
  },
  {
    id: 18,
    title: "Cordeiro Assado com Ervas",
    category: "Pratos Principais",
    prepTime: "2h30",
    servings: "8 pessoas",
    difficulty: "Difícil",
    ingredients: [
      "1 pernil de cordeiro de 2kg",
      "6 dentes de alho",
      "Alecrim fresco",
      "Tomilho fresco",
      "Azeite",
      "Vinho tinto",
      "Mostarda Dijon",
      "Sal e pimenta"
    ],
    instructions: [
      "Faça furos no cordeiro e insira alho e ervas",
      "Tempere com sal, pimenta e mostarda",
      "Regue com azeite e vinho",
      "Deixe marinar por 4 horas",
      "Asse a 200°C por 2 horas",
      "Deixe descansar antes de fatiar"
    ]
  },
  {
    id: 19,
    title: "Salmão ao Molho de Maracujá",
    category: "Pratos Principais",
    prepTime: "40 min",
    servings: "6 pessoas",
    difficulty: "Médio",
    ingredients: [
      "6 filés de salmão",
      "Polpa de 4 maracujás",
      "200ml de creme de leite",
      "1 cebola picada",
      "Vinho branco",
      "Manteiga",
      "Sal e pimenta"
    ],
    instructions: [
      "Tempere os filés de salmão",
      "Grelhe ou asse até o ponto desejado",
      "Refogue a cebola na manteiga",
      "Adicione vinho branco e reduza",
      "Acrescente polpa de maracujá e creme de leite",
      "Sirva o salmão coberto com o molho"
    ]
  },
  {
    id: 20,
    title: "Costela Bovina ao Vinho Tinto",
    category: "Pratos Principais",
    prepTime: "4 horas",
    servings: "8 pessoas",
    difficulty: "Médio",
    ingredients: [
      "2kg de costela bovina",
      "1 garrafa de vinho tinto",
      "3 cebolas grandes",
      "4 cenouras",
      "Alho",
      "Louro",
      "Tomilho",
      "Caldo de carne"
    ],
    instructions: [
      "Tempere a costela e sele em todos os lados",
      "Retire e refogue os vegetais",
      "Volte a carne, adicione vinho e caldo",
      "Adicione ervas",
      "Cozinhe em panela de pressão por 1h30 ou forno por 4 horas",
      "Sirva com o molho reduzido"
    ]
  },
  {
    id: 21,
    title: "Frango Recheado com Castanhas",
    category: "Pratos Principais",
    prepTime: "2 horas",
    servings: "6 pessoas",
    difficulty: "Médio",
    ingredients: [
      "1 frango inteiro de 2kg",
      "200g de castanhas picadas",
      "Farofa temperada",
      "Bacon",
      "Manteiga",
      "Vinho branco",
      "Ervas finas"
    ],
    instructions: [
      "Prepare o recheio com farofa e castanhas",
      "Recheie o frango",
      "Passe manteiga e temperos por fora",
      "Cubra com fatias de bacon",
      "Regue com vinho branco",
      "Asse a 180°C por 1h30"
    ]
  },
  {
    id: 22,
    title: "Picanha ao Forno com Alecrim",
    category: "Pratos Principais",
    prepTime: "1h30",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "1,5kg de picanha",
      "Sal grosso",
      "Alecrim fresco",
      "Alho",
      "Azeite",
      "Pimenta do reino"
    ],
    instructions: [
      "Tempere a picanha com sal grosso",
      "Faça furos e insira alho e alecrim",
      "Regue com azeite",
      "Deixe descansar por 30 minutos",
      "Asse a 200°C por 40-50 minutos",
      "Deixe descansar antes de fatiar"
    ]
  },
  {
    id: 23,
    title: "Lasanha de Presunto e Queijo",
    category: "Pratos Principais",
    prepTime: "1h30",
    servings: "10 pessoas",
    difficulty: "Médio",
    ingredients: [
      "500g de massa para lasanha",
      "500g de presunto",
      "500g de mussarela",
      "1L de molho branco",
      "Molho de tomate",
      "Queijo parmesão",
      "Orégano"
    ],
    instructions: [
      "Cozinhe a massa conforme embalagem",
      "Prepare molho branco cremoso",
      "Monte camadas: molho, massa, presunto, queijo",
      "Repita as camadas",
      "Finalize com molho branco e parmesão",
      "Asse a 180°C por 40 minutos"
    ]
  },
  {
    id: 24,
    title: "Polvo ao Azeite com Batatas",
    category: "Pratos Principais",
    prepTime: "2 horas",
    servings: "6 pessoas",
    difficulty: "Difícil",
    ingredients: [
      "1 polvo de 1,5kg",
      "1kg de batatas",
      "Azeite português",
      "6 dentes de alho",
      "Páprica doce",
      "Salsa",
      "Louro"
    ],
    instructions: [
      "Cozinhe o polvo com louro até ficar macio",
      "Corte em pedaços",
      "Cozinhe batatas em rodelas",
      "Doure alho no azeite",
      "Adicione polvo e batatas",
      "Tempere com páprica e salsa"
    ]
  },
  {
    id: 25,
    title: "Filé Wellington",
    category: "Pratos Principais",
    prepTime: "2 horas",
    servings: "6 pessoas",
    difficulty: "Difícil",
    ingredients: [
      "800g de filé mignon",
      "Massa folhada",
      "300g de cogumelos",
      "Patê de fígado",
      "Presunto parma",
      "1 ovo",
      "Mostarda Dijon"
    ],
    instructions: [
      "Sele o filé em todos os lados",
      "Pincele com mostarda",
      "Refogue cogumelos até secar",
      "Abra a massa e coloque presunto",
      "Espalhe patê e cogumelos",
      "Enrole o filé e pincele com ovo",
      "Asse a 200°C por 35 minutos"
    ]
  },
  {
    id: 26,
    title: "Bacalhau ao Forno com Natas",
    category: "Pratos Principais",
    prepTime: "1h30",
    servings: "8 pessoas",
    difficulty: "Médio",
    ingredients: [
      "800g de bacalhau dessalgado",
      "1kg de batatas",
      "2 cebolas grandes",
      "500ml de nata",
      "Queijo ralado",
      "Azeite",
      "Alho"
    ],
    instructions: [
      "Cozinhe bacalhau e desfie",
      "Cozinhe batatas e fatie",
      "Refogue cebola e alho",
      "Monte camadas em refratário",
      "Cubra com nata e queijo",
      "Asse a 180°C por 30 minutos"
    ]
  },
  {
    id: 27,
    title: "Pato ao Molho de Laranja",
    category: "Pratos Principais",
    prepTime: "3 horas",
    servings: "6 pessoas",
    difficulty: "Difícil",
    ingredients: [
      "1 pato de 2,5kg",
      "Suco de 6 laranjas",
      "Raspas de laranja",
      "Vinho do Porto",
      "Mel",
      "Gengibre",
      "Sal e pimenta"
    ],
    instructions: [
      "Tempere o pato por dentro e fora",
      "Asse a 180°C por 2h30",
      "Prepare molho com suco, raspas, vinho e mel",
      "Reduza o molho até engrossar",
      "Sirva o pato fatiado com o molho"
    ]
  },

  // ACOMPANHAMENTOS (12 receitas)
  {
    id: 28,
    title: "Farofa Natalina Completa",
    category: "Acompanhamentos",
    prepTime: "30 min",
    servings: "10 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "500g de farinha de mandioca",
      "200g de bacon picado",
      "100g de linguiça calabresa",
      "Ameixa seca picada",
      "Damasco seco picado",
      "Castanha de caju",
      "Cebola e alho",
      "Manteiga",
      "Cheiro-verde"
    ],
    instructions: [
      "Frite o bacon até ficar crocante",
      "Adicione a linguiça picada",
      "Refogue cebola e alho",
      "Adicione as frutas secas e castanhas",
      "Acrescente a farinha aos poucos",
      "Finalize com manteiga e cheiro-verde"
    ],
    tips: "Prepare no dia anterior - fica ainda mais saborosa!"
  },
  {
    id: 29,
    title: "Arroz à Grega",
    category: "Acompanhamentos",
    prepTime: "40 min",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "3 xícaras de arroz",
      "2 cenouras em cubos",
      "1 xícara de ervilha",
      "1 xícara de milho",
      "100g de passas",
      "Cebola e alho",
      "Caldo de galinha",
      "Azeite"
    ],
    instructions: [
      "Refogue cebola e alho no azeite",
      "Adicione cenoura e refogue",
      "Acrescente o arroz e torre",
      "Adicione caldo quente",
      "Quando secar, adicione ervilha, milho e passas",
      "Cozinhe até o arroz ficar macio"
    ]
  },
  {
    id: 30,
    title: "Purê de Batatas Cremoso",
    category: "Acompanhamentos",
    prepTime: "35 min",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "1,5kg de batatas",
      "200ml de creme de leite",
      "100g de manteiga",
      "Leite morno",
      "Noz-moscada",
      "Sal e pimenta"
    ],
    instructions: [
      "Cozinhe as batatas até ficarem macias",
      "Escorra e amasse ainda quentes",
      "Adicione manteiga e misture bem",
      "Acrescente creme de leite",
      "Adicione leite até obter cremosidade",
      "Tempere com noz-moscada, sal e pimenta"
    ]
  },
  {
    id: 31,
    title: "Batatas Assadas com Alecrim",
    category: "Acompanhamentos",
    prepTime: "50 min",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "1,5kg de batatas pequenas",
      "Alecrim fresco",
      "6 dentes de alho",
      "Azeite",
      "Sal grosso",
      "Pimenta do reino"
    ],
    instructions: [
      "Corte as batatas ao meio",
      "Tempere com sal, pimenta e alecrim",
      "Adicione alho amassado e azeite",
      "Misture bem",
      "Disponha em assadeira",
      "Asse a 200°C por 40 minutos, virando na metade"
    ]
  },
  {
    id: 32,
    title: "Legumes Grelhados",
    category: "Acompanhamentos",
    prepTime: "30 min",
    servings: "6 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "2 abobrinhas",
      "2 berinjelas",
      "2 pimentões coloridos",
      "Tomates cereja",
      "Azeite",
      "Ervas finas",
      "Sal e pimenta"
    ],
    instructions: [
      "Corte os legumes em fatias grossas",
      "Tempere com azeite, sal, pimenta e ervas",
      "Deixe marinar por 15 minutos",
      "Grelhe em frigideira ou churrasqueira",
      "Vire quando dourar",
      "Sirva quente ou em temperatura ambiente"
    ]
  },
  {
    id: 33,
    title: "Couve-Flor Gratinada",
    category: "Acompanhamentos",
    prepTime: "45 min",
    servings: "8 pessoas",
    difficulty: "Médio",
    ingredients: [
      "1 couve-flor grande",
      "500ml de molho branco",
      "200g de queijo ralado",
      "Noz-moscada",
      "Manteiga",
      "Farinha de rosca"
    ],
    instructions: [
      "Cozinhe a couve-flor em floretes",
      "Prepare molho branco cremoso",
      "Disponha a couve-flor em refratário",
      "Cubra com molho branco",
      "Polvilhe queijo e farinha de rosca",
      "Asse a 180°C até gratinar"
    ]
  },
  {
    id: 34,
    title: "Salpicão Tradicional",
    category: "Acompanhamentos",
    prepTime: "40 min",
    servings: "10 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "500g de frango cozido e desfiado",
      "2 cenouras raladas",
      "1 lata de ervilha",
      "1 lata de milho",
      "200g de batata palha",
      "Maionese",
      "Uvas passas",
      "Maçã picada"
    ],
    instructions: [
      "Misture frango, cenoura, ervilha e milho",
      "Adicione maçã e passas",
      "Tempere com sal e pimenta",
      "Adicione maionese até obter cremosidade",
      "Leve à geladeira por 2 horas",
      "Na hora de servir, adicione batata palha"
    ]
  },
  {
    id: 35,
    title: "Risoto de Funghi",
    category: "Acompanhamentos",
    prepTime: "45 min",
    servings: "6 pessoas",
    difficulty: "Médio",
    ingredients: [
      "2 xícaras de arroz arbóreo",
      "300g de cogumelos variados",
      "1L de caldo de legumes quente",
      "1 cebola picada",
      "Vinho branco",
      "Manteiga",
      "Queijo parmesão",
      "Tomilho"
    ],
    instructions: [
      "Refogue cebola na manteiga",
      "Adicione arroz e torre",
      "Adicione vinho e deixe evaporar",
      "Acrescente caldo aos poucos, mexendo sempre",
      "Refogue cogumelos separadamente",
      "Finalize com cogumelos, manteiga e parmesão"
    ]
  },
  {
    id: 36,
    title: "Maionese Caseira",
    category: "Acompanhamentos",
    prepTime: "20 min",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "3 batatas cozidas",
      "2 cenouras cozidas",
      "1 xícara de maionese",
      "Salsinha picada",
      "Sal e pimenta"
    ],
    instructions: [
      "Corte batatas e cenouras em cubos",
      "Misture com maionese",
      "Tempere com sal e pimenta",
      "Adicione salsinha",
      "Leve à geladeira",
      "Sirva gelado"
    ]
  },
  {
    id: 37,
    title: "Vinagrete Especial",
    category: "Acompanhamentos",
    prepTime: "15 min",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "4 tomates picados",
      "2 cebolas picadas",
      "1 pimentão verde picado",
      "Cheiro-verde",
      "Azeite",
      "Vinagre",
      "Sal"
    ],
    instructions: [
      "Pique todos os vegetais em cubos pequenos",
      "Misture em uma tigela",
      "Tempere com sal",
      "Adicione azeite e vinagre",
      "Misture bem",
      "Deixe descansar por 30 minutos"
    ]
  },
  {
    id: 38,
    title: "Nhoque de Batata ao Molho Sugo",
    category: "Acompanhamentos",
    prepTime: "1h30",
    servings: "6 pessoas",
    difficulty: "Médio",
    ingredients: [
      "1kg de batatas",
      "2 xícaras de farinha de trigo",
      "1 ovo",
      "Sal",
      "Molho de tomate caseiro",
      "Manjericão",
      "Queijo parmesão"
    ],
    instructions: [
      "Cozinhe e amasse as batatas",
      "Misture com farinha, ovo e sal",
      "Faça rolinhos e corte em pedaços",
      "Marque com garfo",
      "Cozinhe em água fervente até subirem",
      "Sirva com molho sugo e parmesão"
    ]
  },
  {
    id: 39,
    title: "Tabule Libanês",
    category: "Acompanhamentos",
    prepTime: "30 min",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "1 xícara de trigo para quibe",
      "4 tomates picados",
      "1 maço de hortelã",
      "1 maço de salsinha",
      "Suco de 3 limões",
      "Azeite",
      "Sal"
    ],
    instructions: [
      "Hidrate o trigo em água por 20 minutos",
      "Escorra bem",
      "Pique finamente hortelã e salsinha",
      "Misture todos os ingredientes",
      "Tempere com limão, azeite e sal",
      "Leve à geladeira antes de servir"
    ]
  },

  // SOBREMESAS (15 receitas)
  {
    id: 40,
    title: "Rabanada Tradicional",
    category: "Sobremesas",
    prepTime: "40 min",
    servings: "20 unidades",
    difficulty: "Fácil",
    ingredients: [
      "1 pão italiano amanhecido",
      "500ml de leite",
      "4 ovos",
      "Açúcar",
      "Canela em pó",
      "Óleo para fritar"
    ],
    instructions: [
      "Corte o pão em fatias grossas",
      "Molhe no leite morno",
      "Passe nos ovos batidos",
      "Frite em óleo quente até dourar",
      "Escorra em papel toalha",
      "Passe no açúcar com canela"
    ],
    tips: "Sirva quente ou fria - ambas são deliciosas!"
  },
  {
    id: 41,
    title: "Pavê de Chocolate",
    category: "Sobremesas",
    prepTime: "30 min + geladeira",
    servings: "12 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "2 latas de leite condensado",
      "2 latas de creme de leite",
      "4 colheres de chocolate em pó",
      "2 pacotes de biscoito maisena",
      "Leite para molhar",
      "Chocolate granulado"
    ],
    instructions: [
      "Bata leite condensado, creme de leite e chocolate",
      "Molhe os biscoitos no leite",
      "Monte camadas: biscoito e creme",
      "Repita as camadas",
      "Finalize com creme e chocolate granulado",
      "Leve à geladeira por 4 horas"
    ]
  },
  {
    id: 42,
    title: "Torta de Nozes",
    category: "Sobremesas",
    prepTime: "1h30",
    servings: "12 fatias",
    difficulty: "Médio",
    ingredients: [
      "Massa podre para torta",
      "300g de nozes picadas",
      "1 lata de leite condensado",
      "3 ovos",
      "100g de manteiga",
      "Açúcar mascavo",
      "Essência de baunilha"
    ],
    instructions: [
      "Forre forma com a massa",
      "Misture nozes, leite condensado, ovos e manteiga",
      "Adicione açúcar mascavo e baunilha",
      "Despeje sobre a massa",
      "Asse a 180°C por 40 minutos",
      "Deixe esfriar antes de desenformar"
    ]
  },
  {
    id: 43,
    title: "Pudim de Leite Condensado",
    category: "Sobremesas",
    prepTime: "1h + geladeira",
    servings: "10 pessoas",
    difficulty: "Médio",
    ingredients: [
      "1 lata de leite condensado",
      "2 latas de leite (medida da lata)",
      "3 ovos",
      "1 xícara de açúcar para calda"
    ],
    instructions: [
      "Faça a calda com açúcar até caramelizar",
      "Despeje na forma e espalhe",
      "Bata leite condensado, leite e ovos no liquidificador",
      "Despeje sobre a calda",
      "Asse em banho-maria a 180°C por 1 hora",
      "Leve à geladeira por 6 horas antes de desenformar"
    ]
  },
  {
    id: 44,
    title: "Bolo de Frutas Cristalizadas",
    category: "Sobremesas",
    prepTime: "2 horas",
    servings: "15 fatias",
    difficulty: "Médio",
    ingredients: [
      "3 xícaras de farinha de trigo",
      "2 xícaras de açúcar",
      "4 ovos",
      "1 xícara de manteiga",
      "500g de frutas cristalizadas",
      "1 xícara de nozes",
      "1 colher de fermento",
      "Conhaque"
    ],
    instructions: [
      "Deixe as frutas de molho no conhaque",
      "Bata manteiga com açúcar",
      "Adicione ovos um a um",
      "Misture farinha e fermento",
      "Adicione frutas e nozes",
      "Asse a 160°C por 1h30"
    ]
  },
  {
    id: 45,
    title: "Mousse de Maracujá",
    category: "Sobremesas",
    prepTime: "20 min + geladeira",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "1 lata de leite condensado",
      "1 lata de creme de leite",
      "1 xícara de suco de maracujá concentrado",
      "1 envelope de gelatina incolor"
    ],
    instructions: [
      "Dissolva a gelatina conforme embalagem",
      "Bata leite condensado, creme e suco",
      "Adicione a gelatina dissolvida",
      "Despeje em taças",
      "Leve à geladeira por 4 horas",
      "Decore com sementes de maracujá"
    ]
  },
  {
    id: 46,
    title: "Cheesecake de Frutas Vermelhas",
    category: "Sobremesas",
    prepTime: "1h + geladeira",
    servings: "12 fatias",
    difficulty: "Médio",
    ingredients: [
      "200g de biscoito triturado",
      "100g de manteiga derretida",
      "500g de cream cheese",
      "1 lata de leite condensado",
      "Suco de 2 limões",
      "Calda de frutas vermelhas"
    ],
    instructions: [
      "Misture biscoito com manteiga e forre a forma",
      "Bata cream cheese, leite condensado e limão",
      "Despeje sobre a base",
      "Leve à geladeira por 6 horas",
      "Cubra com calda de frutas vermelhas",
      "Sirva gelado"
    ]
  },
  {
    id: 47,
    title: "Sonho de Valsa",
    category: "Sobremesas",
    prepTime: "30 min + geladeira",
    servings: "20 unidades",
    difficulty: "Fácil",
    ingredients: [
      "1 lata de leite condensado",
      "1 lata de creme de leite",
      "3 colheres de chocolate em pó",
      "1 colher de manteiga",
      "Chocolate granulado",
      "Amendoim picado"
    ],
    instructions: [
      "Cozinhe leite condensado, creme, chocolate e manteiga",
      "Mexa até desgrudar da panela",
      "Deixe esfriar",
      "Faça bolinhas",
      "Passe no chocolate granulado",
      "Decore com amendoim"
    ]
  },
  {
    id: 48,
    title: "Torta Holandesa",
    category: "Sobremesas",
    prepTime: "40 min + geladeira",
    servings: "12 fatias",
    difficulty: "Médio",
    ingredients: [
      "200g de biscoito triturado",
      "100g de manteiga",
      "1 lata de leite condensado",
      "200g de creme de leite",
      "Suco de 3 limões",
      "Chocolate meio amargo derretido"
    ],
    instructions: [
      "Faça a base com biscoito e manteiga",
      "Misture leite condensado, creme e limão",
      "Despeje sobre a base",
      "Leve à geladeira por 2 horas",
      "Cubra com chocolate derretido",
      "Volte à geladeira até firmar"
    ]
  },
  {
    id: 49,
    title: "Brigadeiro Gourmet",
    category: "Sobremesas",
    prepTime: "30 min",
    servings: "40 unidades",
    difficulty: "Fácil",
    ingredients: [
      "1 lata de leite condensado",
      "4 colheres de chocolate em pó",
      "1 colher de manteiga",
      "Chocolate granulado",
      "Forminhas"
    ],
    instructions: [
      "Cozinhe todos os ingredientes em fogo baixo",
      "Mexa sem parar até desgrudar",
      "Deixe esfriar",
      "Faça bolinhas com as mãos untadas",
      "Passe no chocolate granulado",
      "Coloque nas forminhas"
    ]
  },
  {
    id: 50,
    title: "Tiramisu Clássico",
    category: "Sobremesas",
    prepTime: "40 min + geladeira",
    servings: "10 pessoas",
    difficulty: "Médio",
    ingredients: [
      "500g de mascarpone",
      "4 ovos",
      "1/2 xícara de açúcar",
      "300ml de café forte",
      "Biscoitos champagne",
      "Cacau em pó",
      "Licor de café (opcional)"
    ],
    instructions: [
      "Separe claras e gemas",
      "Bata gemas com açúcar até clarear",
      "Adicione mascarpone",
      "Bata claras em neve e incorpore",
      "Molhe biscoitos no café",
      "Monte camadas e polvilhe cacau",
      "Geladeira por 4 horas"
    ]
  },
  {
    id: 51,
    title: "Arroz Doce Cremoso",
    category: "Sobremesas",
    prepTime: "50 min",
    servings: "8 pessoas",
    difficulty: "Fácil",
    ingredients: [
      "1 xícara de arroz",
      "1L de leite",
      "1 lata de leite condensado",
      "Canela em pau",
      "Cravo",
      "Canela em pó"
    ],
    instructions: [
      "Cozinhe o arroz em água",
      "Adicione leite aos poucos",
      "Acrescente leite condensado",
      "Adicione canela em pau e cravo",
      "Cozinhe até cremoso",
      "Sirva polvilhado com canela"
    ]
  },
  {
    id: 52,
    title: "Petit Gateau",
    category: "Sobremesas",
    prepTime: "25 min",
    servings: "6 unidades",
    difficulty: "Médio",
    ingredients: [
      "200g de chocolate meio amargo",
      "100g de manteiga",
      "3 ovos",
      "3 gemas",
      "1/2 xícara de açúcar",
      "1/3 xícara de farinha"
    ],
    instructions: [
      "Derreta chocolate com manteiga",
      "Bata ovos, gemas e açúcar",
      "Misture o chocolate",
      "Adicione farinha peneirada",
      "Despeje em forminhas untadas",
      "Asse a 200°C por 12 minutos",
      "Centro deve ficar mole"
    ]
  },
  {
    id: 53,
    title: "Banoffee",
    category: "Sobremesas",
    prepTime: "30 min + geladeira",
    servings: "10 fatias",
    difficulty: "Fácil",
    ingredients: [
      "200g de biscoito triturado",
      "100g de manteiga",
      "1 lata de doce de leite",
      "3 bananas",
      "300ml de creme de leite fresco",
      "Chocolate ralado"
    ],
    instructions: [
      "Faça base com biscoito e manteiga",
      "Espalhe doce de leite",
      "Cubra com bananas fatiadas",
      "Bata creme de leite até chantilly",
      "Cubra com o chantilly",
      "Finalize com chocolate ralado",
      "Geladeira por 2 horas"
    ]
  },
  {
    id: 54,
    title: "Panetone Caseiro",
    category: "Sobremesas",
    prepTime: "4 horas",
    servings: "2 panetones",
    difficulty: "Difícil",
    ingredients: [
      "1kg de farinha de trigo",
      "6 ovos",
      "300g de açúcar",
      "250g de manteiga",
      "500ml de leite morno",
      "50g de fermento biológico",
      "Frutas cristalizadas",
      "Gotas de chocolate"
    ],
    instructions: [
      "Dissolva fermento no leite morno",
      "Misture farinha, açúcar, ovos e manteiga",
      "Adicione o fermento",
      "Sove até desgrudar das mãos",
      "Adicione frutas e chocolate",
      "Deixe crescer por 2 horas",
      "Asse a 180°C por 40 minutos"
    ]
  },

  // BEBIDAS (6 receitas)
  {
    id: 55,
    title: "Ponche de Frutas",
    category: "Bebidas",
    prepTime: "20 min",
    servings: "15 copos",
    difficulty: "Fácil",
    ingredients: [
      "1L de suco de laranja",
      "500ml de suco de abacaxi",
      "1 garrafa de champagne",
      "Frutas picadas (morango, kiwi, laranja)",
      "Hortelã",
      "Gelo"
    ],
    instructions: [
      "Misture os sucos em uma poncheira",
      "Adicione as frutas picadas",
      "Adicione folhas de hortelã",
      "Na hora de servir, adicione champagne",
      "Adicione gelo",
      "Sirva imediatamente"
    ],
    tips: "Prepare sem champagne e adicione apenas na hora de servir."
  },
  {
    id: 56,
    title: "Chocolate Quente Especial",
    category: "Bebidas",
    prepTime: "15 min",
    servings: "6 xícaras",
    difficulty: "Fácil",
    ingredients: [
      "1L de leite",
      "200g de chocolate meio amargo",
      "3 colheres de açúcar",
      "1 colher de amido de milho",
      "Canela em pau",
      "Chantilly para decorar"
    ],
    instructions: [
      "Aqueça o leite com canela",
      "Adicione chocolate picado",
      "Mexa até derreter",
      "Dissolva amido em pouco leite frio",
      "Adicione à panela mexendo",
      "Sirva com chantilly"
    ]
  },
  {
    id: 57,
    title: "Mojito Natalino",
    category: "Bebidas",
    prepTime: "10 min",
    servings: "1 drink",
    difficulty: "Fácil",
    ingredients: [
      "50ml de rum branco",
      "Suco de 1 limão",
      "2 colheres de açúcar",
      "Hortelã fresca",
      "Água com gás",
      "Gelo",
      "Cranberries para decorar"
    ],
    instructions: [
      "Macere hortelã com açúcar e limão",
      "Adicione rum",
      "Complete com gelo",
      "Adicione água com gás",
      "Mexa delicadamente",
      "Decore com cranberries e hortelã"
    ]
  },
  {
    id: 58,
    title: "Quentão Tradicional",
    category: "Bebidas",
    prepTime: "30 min",
    servings: "10 copos",
    difficulty: "Fácil",
    ingredients: [
      "1 garrafa de cachaça",
      "2 xícaras de açúcar",
      "1L de água",
      "Gengibre fatiado",
      "Cravo e canela",
      "Casca de laranja"
    ],
    instructions: [
      "Ferva água com açúcar e especiarias",
      "Deixe em infusão por 15 minutos",
      "Coe",
      "Adicione a cachaça",
      "Aqueça sem ferver",
      "Sirva quente"
    ]
  },
  {
    id: 59,
    title: "Sangria Branca",
    category: "Bebidas",
    prepTime: "15 min + geladeira",
    servings: "8 copos",
    difficulty: "Fácil",
    ingredients: [
      "1 garrafa de vinho branco seco",
      "200ml de licor de pêssego",
      "1 maçã verde fatiada",
      "1 pêssego fatiado",
      "Uvas verdes",
      "Hortelã",
      "Gelo"
    ],
    instructions: [
      "Misture vinho e licor",
      "Adicione todas as frutas",
      "Adicione hortelã",
      "Leve à geladeira por 2 horas",
      "Sirva com gelo",
      "Coloque frutas nos copos"
    ]
  },
  {
    id: 60,
    title: "Limonada Suíça",
    category: "Bebidas",
    prepTime: "10 min",
    servings: "6 copos",
    difficulty: "Fácil",
    ingredients: [
      "6 limões",
      "1 lata de leite condensado",
      "1L de água gelada",
      "Gelo",
      "Açúcar a gosto"
    ],
    instructions: [
      "Lave bem os limões",
      "Corte em rodelas finas",
      "Bata no liquidificador com água e leite condensado",
      "Bata por apenas 10 segundos",
      "Coe",
      "Sirva com gelo"
    ],
    tips: "Não bata muito para não amargar!"
  }
]

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas")
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipesFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Salvar favoritos no localStorage
  useEffect(() => {
    localStorage.setItem('recipesFavorites', JSON.stringify(favorites))
  }, [favorites])

  const categories = ["Todas", "Entradas", "Pratos Principais", "Acompanhamentos", "Sobremesas", "Bebidas"]

  const toggleFavorite = (recipeId: number) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    )
  }

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesCategory = selectedCategory === "Todas" || recipe.category === selectedCategory
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesFavorites = !showFavoritesOnly || favorites.includes(recipe.id)
      
      return matchesCategory && matchesSearch && matchesFavorites
    })
  }, [selectedCategory, searchTerm, showFavoritesOnly, favorites])

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Fácil": return "text-green-600 bg-green-50"
      case "Médio": return "text-yellow-600 bg-yellow-50"
      case "Difícil": return "text-red-600 bg-red-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Entradas": return "🥗"
      case "Pratos Principais": return "🍖"
      case "Acompanhamentos": return "🥘"
      case "Sobremesas": return "🍰"
      case "Bebidas": return "🍹"
      default: return "📖"
    }
  }

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
        {/* Header da Receita */}
        <div className="bg-gradient-to-r from-red-600 to-green-600 text-white py-6 px-4 sm:px-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-4"
            >
              <X className="w-5 h-5" />
              <span>Voltar ao índice</span>
            </button>
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getCategoryIcon(selectedRecipe.category)}</span>
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    {selectedRecipe.category}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">{selectedRecipe.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedRecipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedRecipe.servings}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedRecipe.difficulty)} bg-white/90`}>
                    {selectedRecipe.difficulty}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleFavorite(selectedRecipe.id)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                <Heart 
                  className={`w-6 h-6 ${favorites.includes(selectedRecipe.id) ? 'fill-white' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo da Receita */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredientes */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-red-600" />
                Ingredientes
              </h2>
              <ul className="space-y-3">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modo de Preparo */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-green-600" />
                Modo de Preparo
              </h2>
              <ol className="space-y-4">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-red-500 to-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Dicas */}
          {selectedRecipe.tips && (
            <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                Dica Especial
              </h3>
              <p className="text-gray-700">{selectedRecipe.tips}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-red-700 to-green-600 text-white py-8 px-4 sm:px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12" />
            <h1 className="text-3xl sm:text-5xl font-bold">E-book Natalino</h1>
          </div>
          <p className="text-center text-red-50 text-lg sm:text-xl">
            60 Receitas Especiais para sua Ceia de Natal e Ano Novo
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium">Receitas Testadas e Aprovadas</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
        </div>
      </header>

      {/* Filtros e Busca */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-red-100">
          {/* Busca */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar receitas ou ingredientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Categorias */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Categorias:</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filtro de Favoritos */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              showFavoritesOnly
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-white' : ''}`} />
            <span>Apenas Favoritos ({favorites.length})</span>
          </button>
        </div>

        {/* Grid de Receitas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-red-200 cursor-pointer group"
              onClick={() => setSelectedRecipe(recipe)}
            >
              {/* Header do Card */}
              <div className="bg-gradient-to-r from-red-500 to-green-500 p-4 text-white">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{getCategoryIcon(recipe.category)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(recipe.id)
                    }}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.includes(recipe.id) ? 'fill-white' : ''}`}
                    />
                  </button>
                </div>
                <h3 className="text-xl font-bold group-hover:scale-105 transition-transform">
                  {recipe.title}
                </h3>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-lg">{recipe.category}</span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-2 rounded-xl font-medium hover:shadow-lg transition-all group-hover:scale-105">
                  Ver Receita Completa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma receita encontrada
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-600 to-green-600 text-white py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-300" />
            <p className="text-lg font-semibold">
              Feliz Natal e Próspero Ano Novo!
            </p>
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
          <p className="text-red-50 text-sm">
            Que suas festas sejam repletas de sabor, amor e momentos especiais
          </p>
        </div>
      </footer>
    </div>
  )
}
