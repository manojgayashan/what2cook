const INGREDIENTS = [
  // 🥩 Protein
  { id: '1', name: 'Egg', category: 'protein',active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/egg.png?alt=media&token=c8c74807-517c-4888-8473-09f74ecb1ca6'} },
  { id: '2', name: 'Chicken', category: 'protein',active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/chicken.png?alt=media&token=1e054142-3534-4bd2-baad-97057edcf029'} },
  { id: '3', name: 'Fish', category: 'protein',active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/fish.png?alt=media&token=7c478b83-8ace-4eff-9d6f-55f475681673'}},
  { id: '4', name: 'Prawns', category: 'protein',active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/prawns.png?alt=media&token=10907d68-5b2c-47e6-a691-61a5d3ae538c'} },
  { id: '5', name: 'Beef', category: 'protein' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/beef.png?alt=media&token=86115aff-381b-4a13-922e-e48d85d9ae3a'}},
  { id: '6', name: 'Mutton', category: 'protein',active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/mutton.png?alt=media&token=f25b7031-5ce0-465f-8fb4-b941b891bb6c'} },

  // 🧀 Dairy
  { id: '7', name: 'Cheese', category: 'dairy' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/cheese.png?alt=media&token=307b2322-fa71-489c-98bc-8ba06946d527'}},
  { id: '8', name: 'Milk', category: 'dairy' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/milk.png?alt=media&token=c81ff451-fa58-466b-afb9-a98bbd9ebc33'}},
  { id: '9', name: 'Yogurt', category: 'dairy' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/yogurt.png?alt=media&token=4e46da30-b83d-407d-84d0-8c8017a0c6f7'}},
  { id: '10', name: 'Butter', category: 'dairy' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/butter.png?alt=media&token=28b4b382-12e3-47b2-bdec-992abab6d0af'}},
  { id: '11', name: 'Paneer', category: 'dairy' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/paneer.png?alt=media&token=1a15d0e2-c2d5-4b9d-b0d6-f8f1a299ec97'}},
  { id: '12', name: 'Coconut Milk', category: 'dairy',active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/cocomilk.png?alt=media&token=db628ed4-c03d-407e-96d0-bddf46a0de83'} },

  // 🥕 Vegetables
  { id: '13', name: 'Onion', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/onion.png?alt=media&token=41e81140-2917-4689-8cef-dea1fcdaf123'}},
  { id: '14', name: 'Tomato', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/tomato.png?alt=media&token=0a71f135-31da-4856-a8c9-0d16ce99d52a'}},
  { id: '15', name: 'Potato', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/potato.png?alt=media&token=b946b76a-3520-4fcd-aa25-c16337027cf7'}},
  { id: '16', name: 'Carrot', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/carrots.png?alt=media&token=0ea9fcb1-93f6-42f5-ad2b-39a4cde277ae'}},
  { id: '17', name: 'Capsicum', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/capsicum.png?alt=media&token=2fd256d1-dc94-4a6a-8e1f-e8b2e8438f60'}},
  { id: '18', name: 'Cabbage', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/cabbage.png?alt=media&token=3786e406-f264-40b1-8a9a-14ae5adb74d6'}},
  { id: '19', name: 'Cauliflower', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/cauliflower.png?alt=media&token=59691033-93e6-4a43-be58-138c376d3b09'}},
  { id: '20', name: 'Green Beans', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/greenbeans.png?alt=media&token=27b04333-d0a7-4bde-b475-7f4395addd5b'}},
  { id: '21', name: 'Brinjal', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/brinjal.png?alt=media&token=5d6ddc3c-4368-43bd-81f0-743778628b8e'}},
  { id: '22', name: 'Spinach', category: 'vegetable' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/spinach.png?alt=media&token=86586dd5-787f-4cb8-a3c8-0d5ab06e5d7f'}},

  // 🌿 Herbs & Aromatics
  { id: '23', name: 'Garlic', category: 'herb' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/garlic.png?alt=media&token=3eb5349b-2648-475a-82bb-bafaf630518d'}},
  { id: '24', name: 'Ginger', category: 'herb' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/ginger.png?alt=media&token=223b467e-d18e-43bf-bdb7-aa189c3e91ec'}},
  { id: '25', name: 'Green Chilli', category: 'herb' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/greenchili.png?alt=media&token=3ce27d81-1dc6-4989-8d1c-621c4cad326b'}},
  { id: '26', name: 'Curry Leaves', category: 'herb' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/curryleaves.png?alt=media&token=04df1d3a-3ab6-4c55-b865-b7445e3ce854'}},
  { id: '27', name: 'Coriander Leaves', category: 'herb' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/corianderleaves.png?alt=media&token=b9b7d16f-8bf1-4d22-81dc-faa0d3c3c5af'}},

  // 🌶️ Spices
  { id: '28', name: 'Salt', category: 'spice' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/salt.png?alt=media&token=f14f3a3a-c1c9-46b3-9fab-45655cacae49'}},
  { id: '29', name: 'Pepper', category: 'spice' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/pepper.png?alt=media&token=cd841da4-454c-4f32-bb75-93d5ddb0932e'}},
  { id: '30', name: 'Chilli Powder', category: 'spice' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/chillipowder.png?alt=media&token=9ba4dbd2-35b8-4960-8d25-a1932adba849'}},
  { id: '31', name: 'Turmeric Powder', category: 'spice' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/turmericpowder.png?alt=media&token=da8a41ef-d708-4d95-8992-74db2bb63e83'}},
  { id: '32', name: 'Curry Powder', category: 'spice' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/currypowder.png?alt=media&token=853505ec-2446-43e8-a648-d38f9c6e76e2'}},

  // 🍚 Grains / Staples
  { id: '33', name: 'Rice', category: 'grain' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/rice.png?alt=media&token=695bb057-c91b-4265-949d-a8412e82b65b'}},
  { id: '34', name: 'Pasta', category: 'grain' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/pasta.png?alt=media&token=c97cd122-c820-4744-884a-820f099b4730'}},
  { id: '35', name: 'Noodles', category: 'grain' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/noodles.png?alt=media&token=a560157b-8ccc-4dbd-81b7-fdb8f558dc03'}},
  { id: '36', name: 'Bread', category: 'grain' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/bread.png?alt=media&token=d74bafb8-bca3-446f-a1c3-e636c8df9426'}},
  { id: '37', name: 'Flour', category: 'grain' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/flour.png?alt=media&token=2f9bb252-4d12-4895-b895-220d6b59e556'}},

  // 🫒 Oils
  { id: '38', name: 'Cooking Oil', category: 'oil' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/cookingoil.png?alt=media&token=064e13e3-1716-4b41-8cca-f299a808831f'}},
  { id: '39', name: 'Olive Oil', category: 'oil' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/oliveoil.png?alt=media&token=9354a3ca-6cca-4cb3-b89a-a045bfd79795'}},

  // 🧂 Sauces
  { id: '40', name: 'Soy Sauce', category: 'sauce' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/soysause.png?alt=media&token=c73da7a5-147e-4d6f-94a1-206e00d40e08'}},
  { id: '41', name: 'Chilli Sauce', category: 'sauce' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/chillisause.png?alt=media&token=23490eff-5212-4334-ab34-e65ec34a10af'}},
  { id: '42', name: 'Tomato Sauce', category: 'sauce' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/tomatosause.png?alt=media&token=c3a74e48-e97b-4482-8c0a-95c06f1a0b7c'}},

  // 🍄 Extras
  { id: '43', name: 'Mushroom', category: 'extra' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/mushroom.png?alt=media&token=138ad809-a87a-4a37-bbe9-51fb245a7e6b'}},
  { id: '44', name: 'Sweet Corn', category: 'extra' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/sweetcorn.png?alt=media&token=f4c9911b-8459-490b-bfb4-b252b4da70f7'}},
  { id: '45', name: 'Peas', category: 'extra' ,active:true,image:{uri:'https://firebasestorage.googleapis.com/v0/b/what2cook-caad5.firebasestorage.app/o/peas.png?alt=media&token=370df9ce-feae-4583-9ae1-78765a3f55a3'}},
];

export default INGREDIENTS;