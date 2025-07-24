import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZHB0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTc1MzM1NzA3MSwiZXhwIjoxNzUzMzU4NTExfQ.DC7i7NaKnJ0RtvzdFxjtORH1kWNdkJx8RUvr-pc70ks';

const fakeItem = () => ({
  name: faker.commerce.productName(),
  unitPrice: Number(faker.commerce.price({ min: 1, max: 100 })),
  quantity: faker.number.int({ min: 1, max: 10 })
});

const createFakeReceipt = () => ({
  items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, fakeItem),
  fiscalCode: faker.string.alphanumeric(8),
  taxAmount: 0.2,
  signature: `Signature-${faker.person.firstName()}`,
  paymentType: 'CASH',
  status: 'PENDING'
});

const sendFakeReceipt = async () => {
  const fakeReceipt = createFakeReceipt();

  const res = await fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: `
        mutation PublishReceipt($receipt: ReceiptInput!) {
          publishReceipt(receipt: $receipt) {
            id
            total
            fiscalCode
            timestamp
            status
          }
        }
      `,
      variables: {
        receipt: fakeReceipt
      }
    })
  });

  const data = await res.json();
  console.log('Published:', data.data?.publishReceipt || data.errors);
};

const times = 10;
for (let i = 0; i < times; i++) {
  setTimeout(() => sendFakeReceipt(), i * 1000);
}