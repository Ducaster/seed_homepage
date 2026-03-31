import { Sprout } from "lucide-react";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-seed-earth-900 text-seed-earth-300 py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-seed-green-500" />
            <span className="text-lg font-bold text-white">SEED</span>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-white transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-white transition-colors">
              문의하기
            </a>
          </div>

          <p className="text-sm text-seed-earth-300">
            &copy; {new Date().getFullYear()} SEED. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
