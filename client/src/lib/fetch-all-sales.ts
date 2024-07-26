export const getSales = async () => {
    try {
      const res = await fetch('http://localhost:8000/get-sales', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            {
              getSalesData {
                products {
                  id
                  name
                  category
                  price
                  stock
                }
                sales {
                  id
                  product {
                    name
                  }
                  customer {
                    name
                  }
                  date
                  quantity
                  total
                }
                customers {
                  id
                  name
                  email
                  totalSpent
                }
              }
            }
          `
        })
      });
  
      const salesData = await res.json();
      if (salesData.errors) {
        console.error('GraphQL errors:', salesData.errors);
      } else {
        return salesData.data.getSalesData;
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };