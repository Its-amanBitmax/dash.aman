import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import About from "./pages/About/About";
import Create from "./pages/About/Create";
import Edit from "./pages/About/Edit";
import Service from "./pages/Services/services";
import CreateService from "./pages/Services/create";
import EditService from "./pages/Services/edit";
import Comments from "./pages/Comments";
import Contact from "./pages/Contacts/Contact.jsx";
import ContactCreate from "./pages/Contacts/Contact-create.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";
import BlogList from "./pages/Blogs/Blog-list.jsx";
import BlogCreate from "./pages/Blogs/Blog-create.jsx";
import BlogEdit from "./pages/Blogs/Blog-edit.jsx";
import ContactInfo from "./pages/Contacts/Contact";
import ContactInfoList from "./pages/Contacts/Contact-create";
import ContactInfoCreate from "./pages/Contacts/ContactInfo-create";
import ContactInfoEdit from "./pages/Contacts/ContactInfo-edit";
import BannerPage from "./pages/Banner/Banner";
import CreateBanner from "./pages/Banner/create";
import EditBanner from "./pages/Banner/edit";
import Project from "./pages/Project/Project.jsx";
import CreateProject from "./pages/Project/create.jsx";
import EditProject from "./pages/Project/edit.jsx";
import Testimonial from "./pages/Testimonial/Testimonial.jsx";
import Testimonialcard from "./pages/Testimonial/Testimonialcard.jsx";
import Skills from "./pages/Skills/Skills";
import CreateSkill from "./pages/Skills/create .jsx";
import EditSkill from "./pages/Skills/edit.jsx";
import Stats from "./pages/Stats";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <main className="ml-64 flex-1 mt-4">
                  <Routes>
                    <Route path="about" element={<About />} />
                    <Route path="create" element={<Create />} />
                    <Route path="edit/:id" element={<Edit />} />
                    <Route path="services" element={<Service />} />
                    <Route path="services/create" element={<CreateService />} />
                    <Route path="services/edit/:id" element={<EditService />} />
                    <Route path="comments" element={<Comments />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="contact/create" element={<ContactCreate />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="blogs/list" element={<BlogList />} />
                    <Route path="blogs/create" element={<BlogCreate />} />
                    <Route path="blogs/edit/:id" element={<BlogEdit />} />
                    <Route path="contactinfo" element={<ContactInfo />} />
                    <Route
                      path="contactinfo/list"
                      element={<ContactInfoList />}
                    />
                    <Route
                      path="contactinfo/create"
                      element={<ContactInfoCreate />}
                    />
                    <Route
                      path="contactinfo/edit/:id"
                      element={<ContactInfoEdit />}
                    />
                    <Route path="banner" element={<BannerPage />} />
                    <Route path="banner/create" element={<CreateBanner />} />
                    <Route path="banner/edit/:id" element={<EditBanner />} />
                    <Route path="project" element={<Project />} />
                    <Route path="project/create" element={<CreateProject />} />
                    <Route path="project/edit/:id" element={<EditProject />} />
                    <Route path="testimonial" element={<Testimonial />} />
                    <Route
                      path="testimonial/manage"
                      element={<Testimonialcard />}
                    />
                    <Route path="skills" element={<Skills />} />
                    <Route path="skills/create" element={<CreateSkill />} />
                    <Route path="skills/edit/:id" element={<EditSkill />} />
                    <Route path="stats" element={<Stats />} />
                  </Routes>
                </main>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
