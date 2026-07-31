import { useState } from 'react';
import './App.css';

const products = [
  {
    id: 1,
    name: 'Topo de Bolo Dia dos Pais #001',
    description: 'Caixa especial com detalhes personalizados para presentear com carinho.',
    price: 7.90,
    image: '/1.jpg',
  },
  {
    id: 2,
    name: 'Topo de Bolo Dia dos Pais #002',
    description: 'Uma opção elegante para presentear em datas especiais e comemorações.',
    price: 7.9,
    image: '/2.jpg',
  },
  {
    id: 3,
    name: 'Kit 8 Mimos Dia dos Pais #003',
    description: 'Ideal para quem gosta de receber um presente cheio de detalhes.',
    price: 4.9,
    image: '/3.jpg',
  },
];

const whatsappNumber = '5585998147419';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const setItemQuantity = (id, value) => {
    const nextQuantity = Number(value);

    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id === id) {
            if (Number.isNaN(nextQuantity) || nextQuantity <= 0) {
              return { ...item, quantity: 0 };
            }
            return { ...item, quantity: nextQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const buildMessage = () => {
    const lines = [
      'Olá! Estou interessado nos produtos abaixo:',
      ...cart.map((item) => `- ${item.name} (qtd: ${item.quantity})`),
      '',
      `Total: R$ ${totalValue.toFixed(2).replace('.', ',')}`,
    ];

    return encodeURIComponent(lines.join('\n'));
  };

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${buildMessage()}`;

  return (
    <div className="app-shell">
      <header className="hero-section">
        <nav className="top-nav">
          <img className="logo" src="/LogoG-removebg.png" alt="Ateliê dos Mimos" />
          <span className="brand">Ateliê dos Mimos</span>
          <div className="nav-links">
            <a href="#produtos">Produtos</a>
            <a href="#carrinho">Carrinho</a>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Papelaria personalizada</p>
            <h1>
              <span className="brand-line">Ateliê dos</span>
              <span className="brand-line accent">Mimos</span>
            </h1>
            <p className="hero-text">
              Presentes feitos com carinho, design delicado e identidade que encantam desde o primeiro olhar.
            </p>
            <a className="primary-btn" href="#produtos">
              Ver produtos
            </a>
          </div>

        </div>
      </header>

      <main className="main-content">
        <section id="produtos" className="products-section">
          <div className="section-heading">
            <p className="eyebrow">Produtos</p>
            <h2>Escolha seus mimos</h2>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                    <button type="button" onClick={() => addToCart(product)}>
                      Adicionar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside id="carrinho" className="cart-panel" aria-label="Carrinho de compras">
          <div className="cart-header">
            <h2>Carrinho</h2>
            <span>{totalItems} item(s)</span>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Seu carrinho ainda está vazio. Escolha alguns produtos.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="cart-controls">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => setItemQuantity(item.id, event.target.value)}
                      aria-label={`Quantidade de ${item.name}`}
                    />
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="cart-summary">
            <div className="summary-row">
              <span>Total</span>
              <strong>R$ {totalValue.toFixed(2).replace('.', ',')}</strong>
            </div>

            <a
              className={`whatsapp-btn ${cart.length === 0 ? 'disabled' : ''}`}
              href={cart.length > 0 ? whatsappLink : `https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                if (cart.length === 0) {
                  event.preventDefault();
                }
              }}
            >
              Enviar pedido para o WhatsApp
            </a>
            <p className="helper-text">
              O pedido será enviado com os itens e a quantidade escolhidos.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
