import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from './ModalAccountPage';
import './MyAccountPage.css';

function MyAccountPage(props) {
  const { setIsLoggedIn} = props;
  const {userData} = props;
  const [userType, setUserType] = useState('vendor');
  const [user,setUser] = useState([]);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("token removido");
    setIsLoggedIn(false);
    navigate('/login');
  }

  useEffect(() => {
    if(userData){
      setUser(userData);
      if(userData.categoriaUsuario === 'vendedor'){
        setUserType('vendor');
      }
    }  
  }, [user,userType, userData]);
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Producto 1',
      price: 10.99,
      image: 'https://s2.ppllstatics.com/diariovasco/www/multimedia/202106/04/media/cortadas/platano-kUyC-RCIEbjdcaFn9Yc7KKpofzYN-1248x770@Diario%20Vasco-DiarioVasco.jpg',
      description: 'Descripción del producto 1',
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 19.99,
      image: 'https://th.bing.com/th/id/R.c6ef1c7c177ba0e205add120ea606bf5?rik=v3wGpu4bFxqMtA&riu=http%3a%2f%2fwww.ibereco.com%2fimagen%2fcompleta%2f0%2f0%2fmanzana-roja-unidad_1.jpg&ehk=YYUtD01LCi9sJPys3KZ4sp83JmIlX0wQrzg79GZBO3w%3d&risl=&pid=ImgRaw&r=0',
      description: 'Descripción del producto 2',
    },

    // Agrega más productos según sea necesario
  ]);

  const handleOpenPurchaseModal = () => {
    setIsPurchaseModalOpen(true);
  };

  const handleModalClose = () => {
    setIsPurchaseModalOpen(false);
  };

  const userProductIds = user.productIds && Array.isArray(user.productIds) ? user.productIds : [];
  const userProducts = userProductIds.map((productId) =>
    products.find((product) => product.id === productId)
  );
  return (
    <div className="my-account-page">
      <div className={`my-account-container ${userType === 'vendor' ? 'vendor-info' : 'buyer-info'}`}>
        <div className='my-account-img'>
          <img src={user.imagenUsuario} alt={user.nombreUsuario} className='info-image' />
        </div>
        <div className='my-account-info'>
          <h2>{user.nombreUsuario}</h2>
          <p><strong>Provincia: </strong>{user.provinciaUsuario}</p>
          <p><strong>Ciudad: </strong> {user.city}</p>
          <p><strong>Direccion: </strong> {user.callePrincipalUsuario} y {user.calleSecundariaUsuario}</p>
          {userType === 'buyer' && (
            <div className='my-account-info'>
              <p><strong>Estado de Compra: </strong> {user.purchaseStatus}</p>
              <span className='span-purchases' onClick={handleOpenPurchaseModal}>
                <h4>Ver compras</h4>
              </span>
            </div>
          )}
          {userType === 'vendor' && (
            <div className='my-account-info'>
              <a href={`https://wa.me/${user.whatsappNumber}`}>
                <button className="whatsapp-button">WhatsApp</button>
              </a>
            </div>
          )}
        </div>
        <div className='my-account-text'>
          {userType === 'vendor' && (
            <>
              <h2>Informacion adicional</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit magnis tristique est taciti congue, elementum curae justo turpis cras primis nisi tincidunt tortor mus vehicula. Suscipit ut eros viverra nulla elementum mollis facilisi natoque hac, eu arcu fringilla imperdiet ante nisi tincidunt class. Parturient nibh egestas curae hendrerit rutrum purus nec tempus vehicula pretium id luctus quam ante, metus posuere suscipit platea facilisis et erat sed viverra sagittis scelerisque enim turpis.</p>
            </>
          )}
        </div>
      </div>
      <div className="user-type-buttons">
        <button className='user-type-button' onClick={() => handleLogout()}>Cerrar Sesión</button>
      </div>
      {/* Modal de compras */}
      {userType === 'buyer' && (
        <Modal isOpen={isPurchaseModalOpen} onClose={() => setIsPurchaseModalOpen(false)}>
          <h2>Compras realizadas</h2>
          {userProducts.map((product, index) => (
            <p key={index}>
              <strong>Producto {index + 1}: </strong> {product ? product.name : 'Producto no encontrado'}
            </p>
          ))}
        </Modal>
      )}
    </div>
  );
}

export default MyAccountPage;
