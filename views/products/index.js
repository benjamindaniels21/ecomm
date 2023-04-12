module.exports = ({ products }) => {
  const rederedProducts = products
    .map((product) => {
      return `
        <li>${product.title} - ${product.price}</li>    
    `;
    })
    .join("");

  return `
        <ul>
        ${rederedProducts}
        </ul>
    `;
};
