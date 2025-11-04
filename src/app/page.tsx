import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-base-900 h-screen flex">
      <div className="p-12 flex flex-col justify-around items-center w-full">
        <div className="items-center flex flex-col w-full space-y-10">
          <Image
            src="/assets/logo-light.png"
            alt="icon"
            width={200}
            height={100}
          />
          <span className="text-white font-bold text-2xl text-center">
            ⚠️ 본 페이지는 임시페이지로 실제 구현에서는 로그인 유저별로
            방어페이지와 평가페이지가 분리될 예정임 ⚠️
          </span>
        </div>

        <div className="space-x-24">
          <Link href="/defend">
            <button className="bg-primary-300 p-6 rounded-lg w-max text-white font-bold cursor-pointer">
              방어페이지로 이동 →
            </button>
          </Link>
          <Link href={"/eval-assessment"}>
            <button className="bg-primary-600 p-6 rounded-lg w-max text-white font-bold cursor-pointer">
              평가페이지로 이동 →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
