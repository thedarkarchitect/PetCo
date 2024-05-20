import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const list = [{ id: 8 }, { id: 9 }];
// const list2 = [];

// const products = async (id) => {
// 	const results =  await prisma.product.findUnique({
// 		where: {
// 			id: id,
// 		},
// 	});
// 	return results
// };

// const resu = list.map((item) =>
// 	products(item.id)
// );

// console.log(resu)

const order = async () => {
	const products = await prisma.product.findFirst()
	return products
}

console.log(order().then(product => {product}))

// console.log(list2)
// products(5).then(product => {
//     console.log("product", product)
// })




