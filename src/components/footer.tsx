"use  client"

import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import logoImg from "@/assets/logo.png";
import Link from 'next/link';


export function Footer() {
  return (
    <footer className=" border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 fade-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className=" relative w-14 h-14">
                <Image
                  src={logoImg}
                  alt="imagem do logo tipo"
                  className="object-contain"
                  fill
                  quality={100}
                  priority
                  sizes="(max-width: 768px) 100vw,"
                />
              </div>
              <span className="font-semibold text-2xl">Mind Night</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Transforme seus sonhos em insights poderosos para o autoconhecimento e crescimento pessoal.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-300 hover:text-yellow-500 transition-colors">Recursos</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-yellow-500 transition-colors">Preços</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-yellow-500 transition-colors">Demonstração</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-300 hover:text-yellow-500 transition-colors">Central de Ajuda</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-yellow-500 transition-colors">Documentação</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-yellow-500 transition-colors">Comunidade</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-yellow-500 transition-colors">Status</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-slate-300">
                <Mail className="h-4 w-4 mr-2" />
                contato@dreamjournal.com
              </li>
              <li className="flex items-center text-slate-300">
                <Phone className="h-4 w-4 mr-2" />
                (11) 9999-9999
              </li>
              <li className="flex items-center text-slate-300">
                <MapPin className="h-4 w-4 mr-2" />
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 DreamJournal. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-slate-400 hover:text-yellow-500 transition-colors text-sm">
              Privacidade
            </Link>
            <Link href="#" className="text-slate-400 hover:text-yellow-500 transition-colors text-sm">
              Termos
            </Link>
            <Link href="#" className="text-slate-400 hover:text-yellow-500 transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}