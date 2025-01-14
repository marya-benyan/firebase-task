const firebaseConfig = {
  apiKey: "AIzaSyAtsHBUIlmYK1FkeWT3DYqc0AwbcVVyeBQ",
  authDomain: "my-firebase-task-facf1.firebaseapp.com",
  databaseURL: "https://my-firebase-task-facf1-default-rtdb.firebaseio.com",
  projectId: "my-firebase-task-facf1",
  storageBucket: "my-firebase-task-facf1.firebasestorage.app",
  messagingSenderId: "501754914507",
  appId: "1:501754914507:web:317a7b87ad11e786149d4e",
  measurementId: "G-LDL5TPRLK0"
};  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();


document.getElementById('add-product-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('product-title').value;
  const description = document.getElementById('product-description').value;
  const price = document.getElementById('product-price').value;
  const image = document.getElementById('product-image').value;

  const newProductRef = db.ref('products').push();
  newProductRef.set({
    title,
    description,
    price: parseFloat(price),
    image
  }).then(() => {
    alert('Product added successfully!');
    fetchProducts();
  }).catch((error) => {
    console.error(error);
  });
});

function fetchProducts() {
  db.ref('products').once('value').then((snapshot) => {
    const products = snapshot.val();
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    for (const id in products) {
      const product = products[id];
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <img src="${product.image}" alt="${product.title}" style="width:100%;height:auto;">
        <button onclick="deleteProduct('${id}')">Delete</button>
        <button onclick="updateProduct('${id}')">Update</button>
      `;
      container.appendChild(card);
    }
  });
}

fetchProducts();

function deleteProduct(id) {
  db.ref(`products/${id}`).remove().then(() => {
    alert('Product deleted!');
    fetchProducts();
  }).catch((error) => {
    console.error(error);
  });
}

function updateProduct(id) {
  const title = prompt('Enter new title:');
  const description = prompt('Enter new description:');
  const price = prompt('Enter new price:');
  const image = prompt('Enter new image URL:');

  db.ref(`products/${id}`).update({
    title,
    description,
    price: parseFloat(price),
    image
  }).then(() => {
    alert('Product updated!');
    fetchProducts();
  }).catch((error) => {
    console.error(error);
  });
}

document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('User signed up successfully!');
      console.log('Signed up user:', user);
    })
    .catch((error) => {
      console.error('Error signing up:', error.message);
      alert(error.message);
    });
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('User logged in successfully!');
      console.log('Logged in user:', user);
    })
    .catch((error) => {
      console.error('Error logging in:', error.message);
      alert(error.message);
    });
});

document.getElementById('logout-button').addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      alert('User logged out!');
      console.log('User logged out');
    })
    .catch((error) => {
      console.error('Error logging out:', error.message);
    });
});

auth.signInWithEmailAndPassword(email, password)
.then((userCredential) => {
  const user = userCredential.user; // بيانات المستخدم
  console.log('User ID:', user.uid); // ID المستخدم
  console.log('User Email:', user.email); // الإيميل
})
.catch((error) => {
  console.error('Error logging in:', error.message);
});
