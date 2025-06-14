<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-background w-full border-t">
    <div class="container px-4 py-12 md:px-6">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div class="space-y-4">
                <h3 class="text-lg font-bold">재고관리 시스템</h3>
                <p class="text-muted-foreground text-sm">
                    스마트한 재고 관리를 통해 비즈니스의 효율성을 극대화하세요. 실시간 재고 추적과
                    자동화된 발주 관리로 운영 비용을 절감하고 수익성을 높이세요.
                </p>
            </div>
            <div class="space-y-4">
                <h3 class="text-lg font-bold">회사 정보</h3>
                <ul class="space-y-2 text-sm">
                    <li>대표: Lilamaris</li>
                    <li>주소: 서울특별시 강남구 테헤란로 123</li>
                    <li>사업자등록번호: 123-45-67890</li>
                    <li>이메일: contact@inventory-system.com</li>
                </ul>
            </div>
            <div class="space-y-4">
                <h3 class="text-lg font-bold">바로가기</h3>
                <ul class="space-y-2 text-sm">
                    <li>
                        <a href="/features" class="text-muted-foreground hover:text-foreground"
                            >기능 소개</a
                        >
                    </li>
                    <li>
                        <a href="/pricing" class="text-muted-foreground hover:text-foreground"
                            >요금제</a
                        >
                    </li>
                    <li>
                        <a href="/blog" class="text-muted-foreground hover:text-foreground"
                            >블로그</a
                        >
                    </li>
                    <li>
                        <a href="/contact" class="text-muted-foreground hover:text-foreground"
                            >문의하기</a
                        >
                    </li>
                </ul>
            </div>
            <div class="space-y-4">
                <h3 class="text-lg font-bold">법적 고지</h3>
                <ul class="space-y-2 text-sm">
                    <li>
                        <a href="/terms" class="text-muted-foreground hover:text-foreground"
                            >이용약관</a
                        >
                    </li>
                    <li>
                        <a href="/privacy" class="text-muted-foreground hover:text-foreground"
                            >개인정보처리방침</a
                        >
                    </li>
                    <li>
                        <a href="/cookies" class="text-muted-foreground hover:text-foreground"
                            >쿠키 정책</a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <div class="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
            <p>© {currentYear} 재고관리 시스템. All rights reserved.</p>
        </div>
    </div>
</footer>
