const App = () => {
  const [products, setProducts] = React.useState([]);

  const [form, setForm] = React.useState({
    name: "",
    price: "",
  });

  React.useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data)
        setProducts(data);
      });
  }

  function handleSubmit(e){
    e.preventDefault();
    if(!form.name || !form.price){
      return;
    }

    fetch("/api/products", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
      fetchProducts();
      setForm({
        name: '',
        price: ''
      })
      // console.log(data);
    });
  }

  function updateForm(event, field){
    if(field === 'name'){
      setForm({
        ...form,
        name: event.target.value
      })
    }else if(field === 'price'){
      setForm({
        ...form,
        price: event.target.value
      })
    }
  }

  const deleteProduct = (productId) => {
    console.log(productId);
    fetch(`/api/products/${productId}`, {
      method: 'DELETE'
    }).then((res) => res.json())
    .then((data) => {
      fetchProducts();
    })
  }

  return (
    <>
      <div className="card">
        <div className="card-header">Add a Product</div>
        <div className="card-body">
          <form onClick={handleSubmit}>
            <input type="text" placeholder="Enter the product name" className="form-control mt-3" onChange={() => updateForm(event, 'name')} value={form.name} />
            <input type="text" placeholder="Enter the product price" className="form-control mt-3" onChange={() => updateForm(event, 'price')} value={form.price} />
            <button type="submit" className="btn btn-primary mt-3">Add</button>
          </form>
        </div>
      </div>
      <ul className="list-group mt-4">
        {products.map((product) => {
          return (
            <li
              key={product.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{product.name}: </strong>${product.price}
              </div>
              <button className="btn btn-danger" onClick={ () => deleteProduct(product.id) }>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
