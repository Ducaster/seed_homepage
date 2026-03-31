import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <Container className="text-center">
        <h1 className="text-6xl font-bold text-seed-earth-900 mb-4">404</h1>
        <p className="text-lg text-seed-earth-700 mb-8">
          페이지를 찾을 수 없습니다.
        </p>
        <a href="/">
          <Button>홈으로 돌아가기</Button>
        </a>
      </Container>
    </section>
  );
}
