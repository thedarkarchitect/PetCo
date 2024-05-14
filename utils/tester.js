import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const list = [{ id: 5 }, { id: 6 }];
const list2 = [];

const products = async (id) => {
	const results =  await prisma.product.findUnique({
		where: {
			id: id,
		},
	});
};


pr

list.map((item) =>
	products(item.id)
);

console.log(list2)


// console.log(list2)
// products(5).then(product => {
//     console.log("product", product)
// })
