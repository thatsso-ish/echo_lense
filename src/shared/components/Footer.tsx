import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-medium mb-4">CreativeHub</h3>
            <p className="text-sm leading-relaxed">
              Crafting aesthetic, functional, and user-centric digital experiences that help businesses thrive.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-lime-400 transition-colors">Web Design</a></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">Branding</a></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-lime-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-lime-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-lime-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-lime-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-lime-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} CreativeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
