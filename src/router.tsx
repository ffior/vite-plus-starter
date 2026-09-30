import { createBrowserRouter } from 'react-router';
import { Layout } from './layouts/Layout';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            { index: true, Component: HomePage },
            { path: 'about', Component: AboutPage },
        ],
    },
]);
