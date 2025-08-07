import crypto from "crypto";

import { db } from ".";
import { categoryTable, productTable, productVariantTable } from "./schema";

const productImages = {
  Mochila: {
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/1/78f9fa3b_c793_472a_b183_e32495033da2.jpg",
    ],
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/1/dacd9927_7287_4b14_a94f_b3f18c9c4d15.jpg",
    ],
  },
  "Meia Alta": {
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/2/52c14d96_66fb_4b5e_b8a9_6b6cf21fb448.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/2/b38172d0_067a_4f03_975d_3c1c10cfc5f4.jpg",
    ],
  },
  "Boné Nocta": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/3/41f38755_76ea_4630_ba49_59991c345513.jpg",
    ],
    Vinho: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/3/7a8c684b_9373_41aa_879a_c5ec99885b7a.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/3/9bb87d7b_b388_42d8_b5ca_7761804d24f7.jpg",
    ],
  },
  "Boné Curvo": {
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/4/6f6b54d9_f06d_47da_b34a_0641a5e34fa4.jpg",
    ],
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/4/9a1a09d7_4499_4968_9b22_e95200434631.png",
    ],
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/4/ca47bcd5_e418_422d_b85c_45d8245aed03.jpg",
    ],
  },
  "Shorts Active": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/1/2bd85c0d_d637_49f3_bc35_c6c7c0062b5f.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/1/57208a2b_6dda_4f46_a856_dd1b90d7432d.png",
    ],
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/1/91674907_139b_41b1_95fa_3e570d4376f1.jpg",
    ],
  },
  "Shorts Core": {
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/2/6120253a_d8b3_453b_a0b5_3ca783ae9510.jpg",
    ],
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/2/a5562ec7_e37a_49db_911b_26dd787463ab.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/2/e067a9e3_f9b4_4d81_8129_c90effc1038b.jpg",
    ],
  },
  "Shorts Challenger": {
    Marrom: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/3/78253172_fe17_4add_b597_88c689a2af3f.jpg",
    ],
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/3/b8bf902f_de19_4ad9_bea8_87aa4d1f5679.webp",
    ],
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/3/eda6b80f_1fba_4934_a242_0cd93b401677.jpg",
    ],
  },
  "Bermuda Premier": {
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/4/7a8d5bd9_0de8_4247_9374_aadce84042ea.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/4/a277cf75_a377_4557_bb70_ef155651338e.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/4/a7948f93_42ac_4363_92a7_e2b3f7754230.jpg",
    ],
  },
  "Calça Nike Club": {
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/1/1cef0dc4_e296_4809_94b6_66cb3164aa43.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/1/611af69f_d7e7_4365_83a8_3aca96922d87.jpg",
    ],
    Vinho: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/1/e4d6bfa8_88b0_484e_8e07_5f5fc5e5cfbb.jpg",
    ],
  },
  "Calça Knit": {
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/2/3e90bb34_eb11_4cc0_930a_f1a4dcb5a4a1.png",
    ],
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/2/d2766b69_177e_4c1d_abfe_93bb92c502f6.png",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/2/e5b271dd_1696_4ff0_8cc9_649b45ef2c88.jpg",
    ],
  },
  "Calça Brooklin": {
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/3/18a2f43f_a0bb_4d7e_a626_27c2f3b58017.jpg",
    ],
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/3/18a2f43f_a0bb_4d7e_a626_27c2f3b58017.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/3/915f96a0_8714_42d7_8d2d_e897d5a9ce7a.jpg",
    ],
  },
  "Calça Jordan": {
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/4/1805ffd2_5fb7_454b_b098_2b00902025f3.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/4/b97f4616_986e_4f1e_a577_905cb99eb213.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/4/d626872b_35b1_4a96_b58a_ea5f7d6ceab7.jpg",
    ],
  },
  "Camiseta ACG": {
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/1/4f57e719_e120_4525_83d5_16955e27061b.png",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/1/a8a08dfb_a495_4c1b_9873_aa504cfe2fd7.webp",
    ],
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/1/a8c7b41f_69f0_4894_994f_de01533d1161.jpg",
    ],
  },
  "Camiseta Run": {
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/2/67db843e_691c_44a6_87b6_f5e01a1bcafe.webp",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/2/83ab03e1_6383_450b_b203_3509a00fdaf7.jpg",
    ],
  },
  "Camiseta Active": {
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/3/c222d1e5_7cd7_4794_b644_57f47c9d344c.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/3/d4c0657c_c2c2_4356_a509_61cd9ecc4148.webp",
    ],
  },
  "Camiseta Nature": {
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/4/caa3015c_61b3_4315_86b1_cc62ab1d2fee.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/4/d0e40dd5_2060_450e_a423_6e894bc0573f.webp",
    ],
  },
  "Corta Vento": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/1/4e134ee9_ce18_4b32_a4ad_aa55026a38f9.jpg",
    ],
    Branco: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/1/74ab7c8c_7c54_4c49_8084_24a87fe0fc85.jpg",
    ],
  },
  "Jaqueta Windrunner": {
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/2/79afe358_deb0_4309_8301_02a6e6aa6108.jpg",
    ],
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/2/bc06d5b0_be4b_4c74_8c6e_8645ea7168bb.jpg",
    ],
  },
  "Jaqueta Style": {
    Marrom: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/3/06222020_01b8_4232_92f4_dc0c92bb25da.webp",
    ],
    Cinza: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/3/97de604a_deef_4594_a5a6_f51c18c71216.jpg",
    ],
  },
  "Jaqueta Nike Club": {
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/4/134c9642_f032_4c6e_84a8_68de99e3dcb7.jpg",
    ],
    Amarela: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/4/d8d78682_c480_40b0_97a1_93ab201b3287.jpg",
    ],
  },
  "Tênis Nike Vomero": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/1/85dc96b6_1cef_43ec_8cef_40e3938ac7cf.jpg",
    ],
    Branco: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/1/a4b97d0e_0065_4818_90f2_b0778ac48c6b.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/1/ac052fe0_60ce_4ce9_8b3c_fd5fb72eaf3b.jpg",
    ],
  },
  "Tênis Nike Panda": {
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/2/2156e314_9889_4bdc_962d_7350f66cdf7f.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/2/2b938204_3950_4295_b61c_d4311045fed0.jpg",
    ],
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/2/6ad78a9f_14a9_4590_8e7c_9392d0523678.jpg",
    ],
  },
  "Tênis Nike Air Force": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/3/5daa00d9_afae_4125_a95c_fc71923b81c3.jpg",
    ],
    Branco: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/3/e6da41fa_1be4_4ce5_b89c_22be4f1f02d4.jpg",
    ],
  },
  "Tênis Nike Dunk Low": {
    Branco: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/4/4bc9c840_d8af_411a_9b72_a3f51f6dd3da.jpg",
    ],
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/4/72f07a5b_4fb8_4182_98b7_1f91ad71ed5c.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/4/bb4e381c_84ae_4ced_814f_8553afc6eacf.jpg",
    ],
  },
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

const categories = [
  {
    name: "Acessórios",
    description: "Mochilas, bonés, meias e outros acessórios",
  },
  {
    name: "Bermuda & Shorts",
    description: "Bermudas e shorts para todas as ocasiões",
  },
  {
    name: "Calças",
    description: "Calças casuais e esportivas",
  },
  {
    name: "Camisetas",
    description: "Camisetas casuais e esportivas",
  },
  {
    name: "Jaquetas & Moletons",
    description: "Jaquetas, corta-ventos e moletons",
  },
  {
    name: "Tênis",
    description: "Tênis casuais e esportivos",
  },
];

const products = [
  // Acessórios
  {
    name: "Mochila",
    description:
      "Mochila resistente e confortável, ideal para o dia a dia e viagens.",
    categoryName: "Acessórios",
    variants: [
      { color: "Preta", price: 12999 },
      { color: "Branca", price: 12999 },
    ],
  },
  {
    name: "Meia Alta",
    description: "Meia alta de algodão, confortável e durável.",
    categoryName: "Acessórios",
    variants: [
      { color: "Branca", price: 1999 },
      { color: "Preta", price: 1999 },
    ],
  },
  {
    name: "Boné Nocta",
    description: "Boné Nocta com design moderno e ajuste confortável.",
    categoryName: "Acessórios",
    variants: [
      { color: "Preto", price: 8999 },
      { color: "Vinho", price: 8999 },
      { color: "Azul", price: 8999 },
    ],
  },
  {
    name: "Boné Curvo",
    description: "Boné com aba curva, estilo clássico e versátil.",
    categoryName: "Acessórios",
    variants: [
      { color: "Azul", price: 7999 },
      { color: "Bege", price: 7999 },
      { color: "Verde", price: 7999 },
    ],
  },

  // Bermuda & Shorts
  {
    name: "Shorts Active",
    description:
      "Shorts esportivo para atividades físicas, com tecido que absorve o suor.",
    categoryName: "Bermuda & Shorts",
    variants: [
      { color: "Preto", price: 6999 },
      { color: "Azul", price: 6999 },
      { color: "Verde", price: 6999 },
    ],
  },
  {
    name: "Shorts Core",
    description: "Shorts casual confortável, perfeito para o dia a dia.",
    categoryName: "Bermuda & Shorts",
    variants: [
      { color: "Verde", price: 5999 },
      { color: "Preto", price: 5999 },
      { color: "Azul", price: 5999 },
    ],
  },
  {
    name: "Shorts Challenger",
    description:
      "Shorts com design moderno e confortável, ideal para diversas ocasiões.",
    categoryName: "Bermuda & Shorts",
    variants: [
      { color: "Marrom", price: 7499 },
      { color: "Preto", price: 7499 },
      { color: "Bege", price: 7499 },
    ],
  },
  {
    name: "Bermuda Premier",
    description:
      "Bermuda premium com qualidade superior e design diferenciado.",
    categoryName: "Bermuda & Shorts",
    variants: [
      { color: "Verde", price: 8999 },
      { color: "Preta", price: 8999 },
      { color: "Azul", price: 8999 },
    ],
  },

  // Calças
  {
    name: "Calça Nike Club",
    description:
      "Calça esportiva Nike Club, confortável e versátil para treinos e uso casual.",
    categoryName: "Calças",
    variants: [
      { color: "Bege", price: 15999 },
      { color: "Preta", price: 15999 },
      { color: "Vinho", price: 15999 },
    ],
  },
  {
    name: "Calça Knit",
    description:
      "Calça de malha com tecido macio e confortável, ideal para relaxar.",
    categoryName: "Calças",
    variants: [
      { color: "Preta", price: 12999 },
      { color: "Branca", price: 12999 },
      { color: "Azul", price: 12999 },
    ],
  },
  {
    name: "Calça Brooklin",
    description:
      "Calça com design urbano e moderno, perfeita para o street style.",
    categoryName: "Calças",
    variants: [
      { color: "Bege", price: 13999 },
      { color: "Branca", price: 13999 },
      { color: "Preta", price: 13999 },
    ],
  },
  {
    name: "Calça Jordan",
    description:
      "Calça Jordan com qualidade premium e design icônico da marca.",
    categoryName: "Calças",
    variants: [
      { color: "Verde", price: 18999 },
      { color: "Preta", price: 18999 },
      { color: "Azul", price: 18999 },
    ],
  },

  // Camisetas
  {
    name: "Camiseta ACG",
    description:
      "Camiseta ACG com design técnico e material de alta qualidade.",
    categoryName: "Camisetas",
    variants: [
      { color: "Bege", price: 6999 },
      { color: "Preta", price: 6999 },
      { color: "Branca", price: 6999 },
    ],
  },
  {
    name: "Camiseta Run",
    description:
      "Camiseta para corrida com tecido respirável e conforto superior.",
    categoryName: "Camisetas",
    variants: [
      { color: "Preta", price: 5999 },
      { color: "Azul", price: 5999 },
    ],
  },
  {
    name: "Camiseta Active",
    description:
      "Camiseta esportiva para atividades físicas com tecnologia Dri-FIT.",
    categoryName: "Camisetas",
    variants: [
      { color: "Branca", price: 5499 },
      { color: "Preta", price: 5499 },
    ],
  },
  {
    name: "Camiseta Nature",
    description:
      "Camiseta com estampa inspirada na natureza, confortável e estilosa.",
    categoryName: "Camisetas",
    variants: [
      { color: "Preta", price: 6499 },
      { color: "Azul", price: 6499 },
    ],
  },

  // Jaquetas & Moletons
  {
    name: "Corta Vento",
    description:
      "Jaqueta corta-vento leve e resistente, ideal para atividades ao ar livre.",
    categoryName: "Jaquetas & Moletons",
    variants: [
      { color: "Preto", price: 19999 },
      { color: "Branco", price: 19999 },
    ],
  },
  {
    name: "Jaqueta Windrunner",
    description:
      "Jaqueta Windrunner com design clássico e proteção contra o vento.",
    categoryName: "Jaquetas & Moletons",
    variants: [
      { color: "Azul", price: 22999 },
      { color: "Bege", price: 22999 },
    ],
  },
  {
    name: "Jaqueta Style",
    description:
      "Jaqueta com estilo urbano e moderno, perfeita para compor looks casuais.",
    categoryName: "Jaquetas & Moletons",
    variants: [
      { color: "Marrom", price: 17999 },
      { color: "Cinza", price: 17999 },
    ],
  },
  {
    name: "Jaqueta Nike Club",
    description: "Jaqueta Nike Club com qualidade premium e design atemporal.",
    categoryName: "Jaquetas & Moletons",
    variants: [
      { color: "Azul", price: 25999 },
      { color: "Amarela", price: 25999 },
    ],
  },

  // Tênis
  {
    name: "Tênis Nike Vomero",
    description:
      "Tênis Nike Vomero com tecnologia de amortecimento superior para corridas.",
    categoryName: "Tênis",
    variants: [
      { color: "Preto", price: 79999 },
      { color: "Branco", price: 79999 },
      { color: "Azul", price: 79999 },
    ],
  },
  {
    name: "Tênis Nike Panda",
    description: "Tênis Nike com design Panda icônico, confortável e estiloso.",
    categoryName: "Tênis",
    variants: [
      { color: "Verde", price: 69999 },
      { color: "Azul", price: 69999 },
      { color: "Preto", price: 69999 },
    ],
  },
  {
    name: "Tênis Nike Air Force",
    description:
      "Tênis Nike Air Force 1, um clássico atemporal com design icônico.",
    categoryName: "Tênis",
    variants: [
      { color: "Preto", price: 89999 },
      { color: "Branco", price: 89999 },
    ],
  },
  {
    name: "Tênis Nike Dunk Low",
    description: "Tênis Nike Dunk Low com design retrô e conforto moderno.",
    categoryName: "Tênis",
    variants: [
      { color: "Branco", price: 75999 },
      { color: "Preto", price: 75999 },
      { color: "Azul", price: 75999 },
    ],
  },
];

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");

  try {
    // Limpar dados existentes
    console.log("🧹 Limpando dados existentes...");
    await db.delete(productVariantTable);
    await db.delete(productTable);
    await db.delete(categoryTable);
    console.log("✅ Dados limpos com sucesso!");

    // Inserir categorias primeiro
    const categoryMap = new Map<string, string>();

    console.log("📂 Criando categorias...");
    for (const categoryData of categories) {
      const categoryId = crypto.randomUUID();
      const categorySlug = generateSlug(categoryData.name);

      console.log(`  📁 Criando categoria: ${categoryData.name}`);

      await db.insert(categoryTable).values({
        id: categoryId,
        name: categoryData.name,
        slug: categorySlug,
      });

      categoryMap.set(categoryData.name, categoryId);
    }

    // Inserir produtos
    for (const productData of products) {
      const productId = crypto.randomUUID();
      const productSlug = generateSlug(productData.name);
      const categoryId = categoryMap.get(productData.categoryName);

      if (!categoryId) {
        throw new Error(
          `Categoria "${productData.categoryName}" não encontrada`,
        );
      }

      console.log(`📦 Criando produto: ${productData.name}`);

      await db.insert(productTable).values({
        id: productId,
        name: productData.name,
        slug: productSlug,
        description: productData.description,
        categoryId: categoryId,
      });

      // Inserir variantes do produto
      for (const variantData of productData.variants) {
        const variantId = crypto.randomUUID();
        const productKey = productData.name as keyof typeof productImages;
        const variantImages =
          productImages[productKey]?.[
            variantData.color as keyof (typeof productImages)[typeof productKey]
          ] || [];

        console.log(`  🎨 Criando variante: ${variantData.color}`);

        await db.insert(productVariantTable).values({
          id: variantId,
          name: variantData.color,
          productId: productId,
          color: variantData.color,
          imageUrl: variantImages[0] || "",
          priceInCents: variantData.price,
          slug: generateSlug(`${productData.name}-${variantData.color}`),
        });
      }
    }

    console.log("✅ Seeding concluído com sucesso!");
    console.log(
      `📊 Foram criadas ${categories.length} categorias, ${
        products.length
      } produtos com ${products.reduce(
        (acc, p) => acc + p.variants.length,
        0,
      )} variantes.`,
    );
  } catch (error) {
    console.error("❌ Erro durante o seeding:", error);
    throw error;
  }
}

main().catch(console.error);
