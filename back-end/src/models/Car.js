import { z } from "zod";

const carColors = [
  "AMARELO",
  "AZUL",
  "BRANCO",
  "CINZA",
  "DOURADO",
  "LARANJA",
  "MARROM",
  "PRATA",
  "PRETO",
  "ROSA",
  "ROXO",
  "VERDE",
  "VERMELHO",
];

const minManufactureYear = 1960;
const maxManufactureYear = new Date().getFullYear();

const inaugurationStoreDate = new Date("2020-03-20");
const today = new Date();

const Car = z.object({
  brand: z
    .string()
    .trim()
    .min(1, { message: "Marca deve ter, no mínimo, 1 caractere." })
    .max(25, { message: "Marca pode ter, no máximo, 25 caracteres." }),

  model: z
    .string()
    .trim()
    .min(1, { message: "Modelo deve ter, no mínimo, 1 caractere." })
    .max(25, { message: "Modelo pode ter, no máximo, 25 caracteres." }),

  color: z.enum(carColors, {
    message: "Cor inválida.",
  }),
  year_manufacture: z
    .number()
    .min(minManufactureYear, {
      message: "Ano de fabricação muito antigo.",
    })
    .max(maxManufactureYear, {
      message: "Ano de fabricação muito recente.",
    }),
  imported: z.boolean().default(false),
  plates: z.string().trim().length(8, {
    message: "Placa deve ter, exatamente, 8 caracteres.",
  }),
  selling_date: z.coerce
    .date()
    .min(inaugurationStoreDate, {
      message: "A data de venda deve ser posterior ao dia 20/03/2020.",
    })
    .max(today, {
      message: "A data de venda não pode ser maior do que a data de hoje.",
    })
    .nullish(),
  selling_price: z.coerce
    .number()
    .min(5000, {
      message: "O valor de venda deve ser maior ou igual a R$ 5.000,00.",
    })
    .max(5000000, {
      message: "O valor de venda deve ser menor ou igual a R$ 5.000.000,00.",
    })
    .nullish(),
});

export default Car;