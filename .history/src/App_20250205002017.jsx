// import React from 'react';
// import { Header } from './Header';
// import Card from './Card';
// import ViTriView from './models/vitriview';

// function App() {
//   const viTri = new ViTriView(1, 'Sài Gòn (TP.HCM)', 'Hồ Chí Minh', 'Việt Nam', 'https://vietnambooking.com/wp-content/uploads/2017/01/du-lich-sai-gon-1.jpg');

//   return (
//     <>
//       <div>
//         <Header />
//         <div>
//           <Card viTri={viTri} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";

function App() {
    return (
        <AuthProvider>
            <Login />
        </AuthProvider>
    );
}

export default App;
