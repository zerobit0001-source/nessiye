"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import {
    AccountBalanceWalletRounded,
    AddRounded,
    BoltRounded,
    CalendarMonthRounded,
    CheckCircleRounded,
    CloseRounded,
    DoneRounded,
    EditRounded,
    EventAvailableRounded,
    Instagram,
    KeyboardArrowDown,
    LinkedIn,
    MoreHorizRounded,
    PersonAddRounded,
    PersonRounded,
    PieChartRounded,
    PlayArrowRounded,
    ReceiptRounded,
    StarRateRounded,
    TrendingUpRounded,
    Twitter,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// مدل‌سازی داده‌های بخش سوالات متداول برای تمیزتر شدن کد
interface FAQItem {
    question: string;
    answer: string;
}

export const NesyehLanding: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const user = useAppSelector((s) => s.userInfo);

    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const faqData: FAQItem[] = [
        {
            question: "آیا اطلاعات مالی مغازه من کاملاً امن است؟",
            answer: "بله، اطلاعات شما با پروتکل‌های پیشرفته AES-256 رمزنگاری شده و بر روی سرورهای ابری فوق‌امن نگهداری می‌شود. سیستم به طور خودکار هر ۶ ساعت یک بار بک‌آپ کامل تهیه می‌کند تا اطلاعات هرگز از دست نرود.",
        },
        {
            question: "اگر اینترنت فروشگاه موقتاً قطع شود چه اتفاقی می‌افتد؟",
            answer: "سامانه نسیه مجهز به سیستم آفلاین هوشمند (PWA) است. شما می‌توانید در زمان قطع اینترنت حساب‌ها را ثبت کنید و به محض اتصال مجدد، کل داده‌ها به طور خودکار همگام‌سازی خواهند شد.",
        },
        {
            question: "هزینه ارسال پیامک‌های یادآوری چگونه محاسبه می‌شود؟",
            answer: "در پلن حرفه‌ای، یک سهمیه پیامک ماهانه رایگان به شما اختصاص داده می‌شود. در صورت مصرف بیش از حد مجاز، می‌توانید بسته‌های پیامکی بسیار ارزان‌قیمت را بدون هیچ کارمزدی خریداری کنید.",
        },
    ];

    return (
        <div className="bg-white text-[#111827] antialiased font-vazir select-none">
            {/* ۱- Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/80 backdrop-blur-md shadow-sm py-3 border-b border-slate-100"
                        : "bg-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1976D2] flex items-center justify-center shadow-lg shadow-[#1976D2]/30">
                            <AccountBalanceWalletRounded className="text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-[#111827]">
                            نسیه<span className="text-[#1976D2]">.</span>
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B7280]">
                        <a
                            href="#features"
                            className="hover:text-[#1976D2] transition-colors"
                        >
                            امکانات سامانه
                        </a>
                        <a
                            href="#dashboard-showcase"
                            className="hover:text-[#1976D2] transition-colors"
                        >
                            پیش‌نمایش
                        </a>
                        <a
                            href="#benefits"
                            className="hover:text-[#1976D2] transition-colors"
                        >
                            مزایا
                        </a>
                        <a
                            href="#pricing"
                            className="hover:text-[#1976D2] transition-colors"
                        >
                            تعرفه‌ها
                        </a>
                        <a
                            href="#faq"
                            className="hover:text-[#1976D2] transition-colors"
                        >
                            سوالات متداول
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* <button
                            className="text-[#6B7280] hover:text-[#111827] text-lg p-2 transition-colors hidden sm:block"
                            title="تغییر پوسته"
                        >
                            <i className="fa-regular fa-moon"></i>
                        </button> */}
                        {user.isAuthenticated ? (
                            <div className="">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={
                                        user.is_shop ? "/dashboard" : "/account"
                                    }
                                >
                                    داشبورد من
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/auth?mode=login"
                                    className="text-sm font-semibold text-[#6B7280] hover:text-[#111827] px-4 py-2 transition-colors"
                                >
                                    ورود
                                </Link>
                                <Link
                                    href="/auth?mode=signup"
                                    className="text-sm font-bold text-white bg-[#1976D2] hover:bg-[#1565C0] px-5 py-2.5 rounded-xl shadow-md shadow-[#1976D2]/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                >
                                    ثبت‌ نام رایگان
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* ۲- Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1976D2]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#42A5F5]/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    <div className="lg:col-span-6 space-y-8 text-center lg:text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1976D2]/10 text-[#1976D2]/90 text-xs font-semibold">
                            <span className="flex h-2 w-2 rounded-full bg-[#1976D2] animate-pulse"></span>
                            نسل جدید مدیریت مالی فروشگاه‌ها در سال ۲۰۲۶
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.25] text-[#111827] tracking-tight">
                            دفتر کل را دور بیندازید.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1976D2] to-[#42A5F5]">
                                حساب‌وکتاب نسیه
                            </span>
                            ، هوشمند شد.
                        </h1>
                        <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl mx-auto lg:mx-0">
                            سامانه‌ای یکپارچه، امن و فوق‌سریع برای سوپرمارکت‌ها،
                            داروخانه‌ها و کسب‌وکارهای کوچک. نسیه مشتریان را ثبت
                            کنید، اقساط را پیگیری نمایید و هوشمندانه یادآور
                            پیامکی بفرستید.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                            <a
                                href="#register"
                                className="w-full sm:w-auto text-center font-bold text-white bg-[#1976D2] hover:bg-[#1565C0] px-8 py-4 rounded-2xl shadow-xl shadow-[#1976D2]/20 hover:shadow-2xl transition-all transform hover:-translate-y-1"
                            >
                                شروع رایگان در کمتر از ۱ دقیقه
                            </a>
                            <a
                                href="#demo"
                                className="w-full sm:w-auto text-center font-bold text-[#111827] bg-white border border-[#E5E7EB] hover:bg-slate-50 px-8 py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                                <PlayArrowRounded className="text-[#1976D2]" />
                                مشاهده دموی زنده سامانه
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative mt-12 lg:mt-0 flex justify-center">
                        <div className="w-full max-w-[540px] bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl p-4 relative z-10 bg-slate-900/5 backdrop-blur-sm">
                            <div className="bg-white rounded-2xl shadow-inner border border-slate-100 overflow-hidden">
                                <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                                        <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                                        <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                                    </div>
                                    <div className="text-xs text-slate-400 bg-white border border-slate-200 px-8 py-1 rounded-md shadow-sm">
                                        app.nesyeh.ir
                                    </div>
                                    <div>
                                        <MoreHorizRounded />
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 space-y-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                            <div className="text-[10px] text-[#6B7280]">
                                                کل طلبکاری‌ها
                                            </div>
                                            <div className="text-sm font-bold text-[#111827] mt-1">
                                                ۸۴,۵۰۰,۰۰۰ تومان
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                            <div className="text-[10px] text-[#6B7280]">
                                                وصولی این ماه
                                            </div>
                                            <div className="text-sm font-bold text-[#2E7D32] mt-1">
                                                ۱۲,۴۰۰,۰۰۰ تومان
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                            <div className="text-[10px] text-[#6B7280]">
                                                اقساط سررسید شده
                                            </div>
                                            <div className="text-sm font-bold text-[#ED6C02] mt-1">
                                                ۴ مورد
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-32 flex items-end gap-3 justify-between">
                                        <div className="w-full bg-slate-100 h-12 rounded-md transition-all hover:bg-[#1976D2]/40"></div>
                                        <div className="w-full bg-[#1976D2]/20 h-20 rounded-md"></div>
                                        <div className="w-full bg-[#1976D2]/40 h-16 rounded-md"></div>
                                        <div className="w-full bg-[#1976D2] h-28 rounded-md relative">
                                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[9px] bg-slate-900 text-white rounded px-1">
                                                جاری
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#1976D2]/60 h-24 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* کلاس‌های انیمیشن float-1 و float-2 را در بخش توضیحات کانفیگ تلویند اضافه کنید */}
                        <div className="absolute -top-6 right-4 sm:-right-6 bg-white/75 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl p-4 flex items-center gap-4 z-20 animate-float-1 max-w-[220px]">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-inner">
                                <DoneRounded />
                            </div>
                            <div>
                                <div className="text-[11px] text-[#6B7280]">
                                    بدهی تسویه شد
                                </div>
                                <div className="text-xs font-bold text-[#111827] mt-0.5">
                                    حاج علی احمدی
                                </div>
                                <div className="text-[10px] text-[#2E7D32] font-medium">
                                    ۱,۲۰۰,۰۰۰ تومان فورا ثبت شد
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 -left-4 sm:-left-8 bg-white/75 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl p-4 flex items-center gap-4 z-20 animate-float-2 max-w-[230px]">
                            <div className="w-10 h-10 rounded-xl bg-[#1976D2]/10 flex items-center justify-center text-[#1976D2] shadow-inner">
                                <PersonAddRounded />
                            </div>
                            <div>
                                <div className="text-[11px] text-[#6B7280]">
                                    مشتری جدید
                                </div>
                                <div className="text-xs font-bold text-[#111827] mt-0.5">
                                    داروخانه دکتر کریمی
                                </div>
                                <div className="text-[10px] text-[#6B7280]">
                                    ایجاد پروفایل و سقف اعتبار
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۳- لوگوی مشتریان (Marquee) */}
            <section className="py-12 border-y border-[#E5E7EB] overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-8">
                        بیش از ۱۰,۰۰۰ فروشگاه خرده‌فروشی و کسب‌وکار در سراسر
                        ایران به نسیه اعتماد دارند
                    </p>
                    <div className="relative w-full flex items-center overflow-hidden">
                        <div className="flex whitespace-nowrap gap-16 text-xl font-bold text-slate-300 animate-marquee">
                            <span className="flex items-center gap-2 hover:text-slate-500 transition-colors cursor-pointer">
                                <i className="fa-solid fa-shop"></i> فروشگاه‌های
                                زنجیره‌ای افق کوروش
                            </span>
                            <span className="flex items-center gap-2 hover:text-slate-500 transition-colors cursor-pointer">
                                <i className="fa-solid fa-prescription-bottle-medical"></i>{" "}
                                داروخانه‌های تخصصی عبیدی
                            </span>
                            <span className="flex items-center gap-2 hover:text-slate-500 transition-colors cursor-pointer">
                                <i className="fa-solid fa-store"></i>{" "}
                                هایپرمارکت‌های محلی تهران
                            </span>
                            <span className="flex items-center gap-2 hover:text-slate-500 transition-colors cursor-pointer">
                                <i className="fa-solid fa-wheat-awn"></i>{" "}
                                بنکداری و توزیع ارمغان
                            </span>
                            <span className="flex items-center gap-2 hover:text-slate-500 transition-colors cursor-pointer">
                                <i className="fa-solid fa-bag-shopping"></i>{" "}
                                زنجیره پوشاک سارک
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۴- قابلیت‌ها */}
            <section id="features" className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                            تمامی ابزارهای مورد نیاز برای کنترل ۱۰۰٪ مالی
                        </h2>
                        <p className="text-[#6B7280] text-base">
                            دیگر نیازی به کاغذ، ماشین‌حساب و دفاتر قدیمی ندارید.
                            همه چیز اینجاست.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[#1976D2]/10 flex items-center justify-center text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white transition-all duration-300 mb-6">
                                <PersonRounded />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-3">
                                مدیریت هوشمند مشتریان
                            </h3>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                تشکیل پرونده الکترونیک، ثبت مشخصات، تعیین سقف
                                اعتبار خرید نسیه و مشاهده کل سابقه در یک صفحه
                                واحد.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[#1976D2]/10 flex items-center justify-center text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white transition-all duration-300 mb-6">
                                <EditRounded />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-3">
                                ثبت نسیه سریع در ۳ ثانیه
                            </h3>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                بدون فوت وقت، مبلغ خرید، اقلام فاکتور و نام
                                مشتری را وارد کرده و سند حسابداری را با دقت بالا
                                ذخیره کنید.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[#1976D2]/10 flex items-center justify-center text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white transition-all duration-300 mb-6">
                                <ReceiptRounded />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-3">
                                ثبت دقیق دریافت‌ها و تسویه
                            </h3>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                پشتیبانی از انواع روش‌های پرداخت اعم از نقدی،
                                کارت به کارت، پوز بانکی و چک بانکی همراه با
                                تاییدیه آنی تسویه.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[#1976D2]/10 flex items-center justify-center text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white transition-all duration-300 mb-6">
                                <EventAvailableRounded />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-3">
                                برنامه‌ریزی و مدیریت اقساط
                            </h3>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                تقسیم فاکتور به اقساط ماهانه یا هفتگی، ردیابی
                                وضعیت پرداخت هر قسط و مانیتورینگ دقیق سررسیدها.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[#1976D2]/10 flex items-center justify-center text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white transition-all duration-300 mb-6">
                                <PieChartRounded />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-3">
                                گزارش‌های جامع و دقیق مالی
                            </h3>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                گزارش‌گیری از بدهی‌های معوقه، جریان نقدی، میزان
                                وصولی روزانه و خروجی اکسل پیشرفته جهت ارائه به
                                حسابدار.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-[#1976D2]/10 flex items-center justify-center text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white transition-all duration-300 mb-6">
                                <BoltRounded />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-3">
                                جستجوی هوشمند (Cmd+K)
                            </h3>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                با موتور جستجوی آنی سیستم، در میان هزاران فاکتور
                                و مشتری، هر داده‌ای را در کسری از ثانیه فورا
                                پیدا کنید.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۵- معرفی داشبورد */}
            <section
                id="dashboard-showcase"
                className="py-24 bg-white border-b border-[#E5E7EB]"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-4">
                            واضح، زیبا و در خدمت کنترل کامل شما
                        </h2>
                        <p className="text-[#6B7280] text-base">
                            طراحی شده با الهام از مدرن‌ترین استانداردهای
                            بین‌المللی برای آنکه در شلوغ‌ترین ساعات کار فروشگاه
                            نیز خطا نکنید.
                        </p>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1976D2]/10 via-transparent to-transparent opacity-50"></div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6 flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-slate-500 text-sm mr-4 font-mono">
                                    پیشخوان اصلی / گزارشات فروش سالیانه
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs flex items-center gap-2">
                                    <CalendarMonthRounded /> خرداد ۱۴۰۵ - تیر
                                    ۱۴۰۵
                                </div>
                                <div className="bg-[#1976D2] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-[#1565C0] transition-colors">
                                    <AddRounded /> ثبت فاکتور جدید
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                            <div className="lg:col-span-8 bg-slate-950/60 rounded-2xl border border-slate-800 p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-slate-200 font-bold text-sm">
                                        نمودار کلی گردش و مانده بدهی‌ها
                                    </h3>
                                    <span className="text-xs text-[#1976D2] font-medium cursor-pointer">
                                        مشاهده جزئیات فاکتورها{" "}
                                        <TrendingUpRounded />
                                    </span>
                                </div>
                                <div className="h-64 flex items-end justify-between pt-6 gap-2">
                                    <div className="w-full space-y-2 text-center">
                                        <div className="bg-slate-800 h-24 w-full rounded-t-lg group-hover:bg-slate-700 transition-colors"></div>
                                        <span className="text-[10px] text-slate-500 block">
                                            فروردین
                                        </span>
                                    </div>
                                    <div className="w-full space-y-2 text-center">
                                        <div className="bg-slate-800 h-36 w-full rounded-t-lg group-hover:bg-slate-700 transition-colors"></div>
                                        <span className="text-[10px] text-slate-500 block">
                                            اردیبهشت
                                        </span>
                                    </div>
                                    <div className="w-full space-y-2 text-center">
                                        <div className="bg-[#1976D2]/40 h-44 w-full rounded-t-lg"></div>
                                        <span className="text-[10px] text-slate-400 block">
                                            خرداد
                                        </span>
                                    </div>
                                    <div className="w-full space-y-2 text-center">
                                        <div className="bg-[#1976D2] h-56 w-full rounded-t-lg shadow-lg shadow-[#1976D2]/20"></div>
                                        <span className="text-[10px] text-[#1976D2] font-bold block">
                                            تیر (جاری)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-6 space-y-4">
                                    <h4 className="text-slate-200 font-bold text-sm">
                                        آخرین فعالیت‌های سیستم
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-xs border-b border-slate-800/50 pb-2">
                                            <span className="text-slate-400">
                                                ارسال پیامک به محمد علوی
                                            </span>
                                            <span className="text-emerald-500">
                                                موفق
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs border-b border-slate-800/50 pb-2">
                                            <span className="text-slate-400">
                                                تسویه اقساط داروخانه مرکزی
                                            </span>
                                            <span className="text-slate-500">
                                                ۱۰ دقیقه پیش
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-400">
                                                پشتیبان‌گیری خودکار از سرور
                                            </span>
                                            <span className="text-[#42A5F5]">
                                                کامل شد
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 text-center space-y-3">
                                    <div className="text-xs text-slate-400">
                                        سقف مجاز اعتبار کل صندوق شما
                                    </div>
                                    <div className="text-2xl font-black text-white">
                                        ۵۰۰,۰۰۰,۰۰۰ تومان
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-[#1976D2] h-full w-3/4"></div>
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                        ۷۵٪ از ظرفیت اعتباری استفاده شده است
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۶- مزایا */}
            <section id="benefits" className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
                        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-xl max-w-sm w-full space-y-6">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                <span className="font-bold text-[#111827]">
                                    شاخص‌های بهینه‌سازی کسب‌وکار
                                </span>
                                <TrendingUpRounded />
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#6B7280]">
                                            کاهش خطای حسابداری
                                        </span>
                                        <span className="font-bold text-[#2E7D32]">
                                            ۱00٪ صفر شدن خطا
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full">
                                        <div className="bg-[#2E7D32] h-full w-full rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#6B7280]">
                                            صرفه‌جویی در زمان روزانه
                                        </span>
                                        <span className="font-bold text-[#1976D2]">
                                            ۴.۵ ساعت در روز
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full">
                                        <div className="bg-[#1976D2] h-full w-[85%] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#6B7280]">
                                            سرعت نقدشوندگی مطالبات
                                        </span>
                                        <span className="font-bold text-amber-600">
                                            ۳ برابر سریع‌تر
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full">
                                        <div className="bg-amber-500 h-full w-[90%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] leading-tight">
                            چرا صاحبان اصناف، «نسیه» را انتخاب اول خود می‌دانند؟
                        </h2>
                        <p className="text-[#6B7280] text-base leading-relaxed">
                            با نسیه، مدیریت مطالبات دیگر یک دغدغه کلافه‌کننده
                            نیست. این سامانه با تمرکز بر نیاز دقیق بازارهای محلی
                            ایران طراحی شده تا توازن مالی مغازه شما حفظ شود.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex gap-3">
                                <div className="text-[#2E7D32] pt-1">
                                    <CheckCircleRounded />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#111827] text-base">
                                        صرفه‌جویی چشمگیر در زمان
                                    </h4>
                                    <p className="text-[#6B7280] text-xs mt-1 leading-relaxed">
                                        دسترسی و ثبت سریع اطلاعات بدون ورق زدن
                                        دفاتر سنگین فروشگاهی.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="text-[#2E7D32] pt-1">
                                    <CheckCircleRounded />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#111827] text-base">
                                        کاهش قطعی خطاهای مالی
                                    </h4>
                                    <p className="text-[#6B7280] text-xs mt-1 leading-relaxed">
                                        محاسبات ریاضی دقیق و خودکار، بدون یک
                                        ریال مغایرت یا جاافتادگی فاکتور.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="text-[#2E7D32] pt-1">
                                    <CheckCircleRounded />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#111827] text-base">
                                        امنیت پیشرفته داده‌ها
                                    </h4>
                                    <p className="text-[#6B7280] text-xs mt-1 leading-relaxed">
                                        ذخیره‌سازی رمزنگاری‌شده ابری؛ دیگر نگران
                                        گم شدن، سوختن یا خیس شدن دفتر نسیه
                                        نباشید.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="text-[#2E7D32] pt-1">
                                    <CheckCircleRounded />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#111827] text-base">
                                        ارسال خودکار پیامک یادآور
                                    </h4>
                                    <p className="text-[#6B7280] text-xs mt-1 leading-relaxed">
                                        پیش از سررسید بدهی، سیستم به صورت
                                        محترمانه پیامک یادآوری ارسال می‌کند.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۷- آمار */}
            <section className="py-16 bg-white border-y border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-[#1976D2]">
                            +۱۰۰,۰۰۰
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-[#6B7280]">
                            تراکنش موفق ثبت شده
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-[#1976D2]">
                            +۱۰,۰۰۰
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-[#6B7280]">
                            مشتری و خریدار فعال
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-[#1976D2]">
                            ۹۹.۹٪
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-[#6B7280]">
                            رضایت خاطر اصناف و بازاریان
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-[#1976D2]">
                            +۵,۰۰۰
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-[#6B7280]">
                            سوپرمارکت و داروخانه فعال
                        </div>
                    </div>
                </div>
            </section>

            {/* ۸- نظرات کاربران */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                            نظرات کسانی که به نسیه کوچ کرده‌اند
                        </h2>
                        <p className="text-[#6B7280] text-base">
                            رضایت کاربران، بزرگترین سرمایه و انگیزه ما در توسعه
                            این محصول لوکس است.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E5E7EB] space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold">
                                    ع
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#111827]">
                                        علیرضا میرزایی
                                    </h4>
                                    <p className="text-xs text-[#6B7280]">
                                        صاحب هایپرمارکت ارمغان
                                    </p>
                                </div>
                            </div>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                «از وقتی نسیه رو نصب کردیم، دیگه هیچ اختلافی سر
                                حساب‌وکتاب با مشتری‌ها نداریم. سرعت اپلیکیشن
                                فوق‌العادست و پیامک‌های اتوماتیک عالی عمل
                                میکنن.»
                            </p>
                            <div className="text-amber-500 text-xs">
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                            </div>
                        </div>

                        <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E5E7EB] space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold">
                                    س
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#111827]">
                                        دکتر سارا تهرانی
                                    </h4>
                                    <p className="text-xs text-[#6B7280]">
                                        مؤسس داروخانه دکتر تهرانی
                                    </p>
                                </div>
                            </div>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                «رابط کاربری این نرم‌افزار به قدری ساده و قشنگه
                                که شاگرد مغازه هم تو ۵ دقیقه کار باهاش رو یاد
                                گرفت. گزارش‌های مالی اکسلش برای حسابدار ما
                                عالیه.»
                            </p>
                            <div className="text-amber-500 text-xs">
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                            </div>
                        </div>

                        <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E5E7EB] space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold">
                                    م
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#111827]">
                                        مهدی کاظمی
                                    </h4>
                                    <p className="text-xs text-[#6B7280]">
                                        مدیر فروشگاه پوشاک کارن
                                    </p>
                                </div>
                            </div>
                            <p className="text-[#6B7280] text-sm leading-relaxed">
                                «بخش مدیریت اقساط نسیه واقعاً کار ما رو راحت
                                کرده. قبلاً باید همش زنگ می‌زدیم ولی الان سیستم
                                خودش سر زمان یادآوری می‌کنه و پول سر وقت نقد
                                میشه.»
                            </p>
                            <div className="text-amber-500 text-xs">
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                                <StarRateRounded />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۹- تعرفه‌ها */}
            <section id="pricing" className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                            سرمایه‌گذاری عادلانه روی آرامش و سود مغازه
                        </h2>
                        <p className="text-[#6B7280] text-base">
                            پلن خود را متناسب با حجم کسب‌وکارتان انتخاب کنید.
                            بدون هزینه‌های پنهان.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-bold text-[#111827]">
                                        🌱 پلن رایگان
                                    </h4>
                                    <p className="text-[#6B7280] text-xs mt-1">
                                        مناسب برای مینی‌مارکت‌ها و استارت کارهای
                                        نوپا
                                    </p>
                                </div>
                                <div className="text-3xl font-black text-[#111827]">
                                    ۰{" "}
                                    <span className="text-sm font-medium text-[#6B7280]">
                                        تومان / ماهانه
                                    </span>
                                </div>
                                <ul className="space-y-3 text-sm text-[#6B7280] border-t border-slate-100 pt-6">
                                    <li>
                                        <DoneRounded /> مدیریت حداکثر تا ۵۰
                                        مشتری
                                    </li>
                                    <li>
                                        <DoneRounded /> ثبت نسیه و پرداخت روزانه
                                    </li>
                                    <li>
                                        <DoneRounded /> گزارش‌گیری پایه داشبورد
                                    </li>
                                    <li className="line-through text-slate-300">
                                        <CloseRounded /> ارسال پیامک یادآوری
                                        خودکار
                                    </li>
                                </ul>
                            </div>
                            <a
                                href="#register"
                                className="mt-8 block text-center py-3 px-6 rounded-xl font-bold bg-slate-100 text-[#111827] hover:bg-slate-200 transition-colors"
                            >
                                شروع کار رایگان
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border-2 border-[#1976D2] shadow-xl flex flex-col justify-between relative transform lg:-translate-y-4">
                            <span className="absolute -top-4 right-6 bg-[#1976D2] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                پیشنهاد ویژه اصناف
                            </span>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-bold text-[#111827]">
                                        🚀 پلن حرفه‌ای
                                    </h4>
                                    <p className="text-[#6B7280] text-xs mt-1">
                                        ویژه سوپرمارکت‌های شلوغ، داروخانه‌ها و
                                        مغازه‌های پرمشتری
                                    </p>
                                </div>
                                <div className="text-3xl font-black text-[#1976D2]">
                                    ۱۹۹,۰۰۰{" "}
                                    <span className="text-sm font-medium text-[#6B7280]">
                                        تومان / ماهانه
                                    </span>
                                </div>
                                <ul className="space-y-3 text-sm text-[#6B7280] border-t border-slate-100 pt-6">
                                    <li>
                                        <DoneRounded /> تعداد مشتریان کاملاً{" "}
                                        <span className="text-[#1976D2] font-bold">
                                            نامحدود
                                        </span>
                                    </li>
                                    <li>
                                        <DoneRounded /> ارسال خودکار پیامک
                                        سررسید اقساط
                                    </li>
                                    <li>
                                        <DoneRounded /> گزارش‌های مالی پیشرفته +
                                        خروجی Excel
                                    </li>
                                    <li>
                                        <DoneRounded /> امکان اتصال به پوز بانکی
                                        مغازه
                                    </li>
                                    <li>
                                        <DoneRounded /> پشتیبانی اولویت‌دار
                                        تلفنی
                                    </li>
                                </ul>
                            </div>
                            <a
                                href="#register"
                                className="mt-8 block text-center py-3 px-6 rounded-xl font-bold bg-[#1976D2] text-white hover:bg-[#1565C0] shadow-md shadow-[#1976D2]/20 transition-all"
                            >
                                انتخاب پلن حرفه‌ای
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-bold text-[#111827]">
                                        🏢 پلن سازمانی
                                    </h4>
                                    <p className="text-[#6B7280] text-xs mt-1">
                                        ویژه فروشگاه‌های زنجیره‌ای و
                                        بازرگانی‌های بزرگ
                                    </p>
                                </div>
                                <div className="text-2xl font-black text-[#111827]">
                                    تماس بگیرید
                                </div>
                                <ul className="space-y-3 text-sm text-[#6B7280] border-t border-slate-100 pt-6">
                                    <li>
                                        <DoneRounded /> اتصال به نرم‌افزارهای
                                        حسابداری داخلی شما
                                    </li>
                                    <li>
                                        <DoneRounded /> استقرار بر روی سرورهای
                                        اختصاصی سازمان
                                    </li>
                                    <li>
                                        <DoneRounded /> پنل پیامکی نامحدود
                                        اختصاصی
                                    </li>
                                    <li>
                                        <DoneRounded /> پشتیبانی اختصاصی ۲۴
                                        ساعته در ۷ روز هفته
                                    </li>
                                </ul>
                            </div>
                            <a
                                href="#contact"
                                className="mt-8 block text-center py-3 px-6 rounded-xl font-bold bg-slate-100 text-[#111827] hover:bg-slate-200 transition-colors"
                            >
                                درخواست مشاوره سازمانی
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۱۰- سوالات متداول */}
            <section id="faq" className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-black text-[#111827]">
                            پاسخ به سوالات متداول شما
                        </h2>
                        <p className="text-[#6B7280] text-sm">
                            هر آنچه لازم است درباره نحوه کارکرد سیستم بدانید.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className={`border border-[#E5E7EB] rounded-2xl p-6 cursor-pointer transition-all ${
                                    activeFaq === index
                                        ? "bg-white shadow-md"
                                        : "bg-slate-50"
                                }`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-[#111827] text-sm sm:text-base">
                                        {item.question}
                                    </h4>
                                    <span
                                        className="text-[#1976D2] text-lg transition-transform duration-300"
                                        style={{
                                            transform:
                                                activeFaq === index
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)",
                                        }}
                                    >
                                        <KeyboardArrowDown />
                                    </span>
                                </div>
                                <div
                                    className={`text-[#6B7280] text-xs sm:text-sm leading-relaxed transition-all duration-300 overflow-hidden ${
                                        activeFaq === index
                                            ? "mt-4 max-h-[500px] opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ۱۱- دعوت نهایی */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-[#1565C0] to-[#1976D2] text-white rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight relative z-10">
                            همین امروز حساب‌های فروشگاهتان را متحول کنید
                        </h2>
                        <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed relative z-10">
                            به جمع هزاران کاسب هوشمندی بپیوندید که با دفترهای
                            قدیمی خداحافظی کرده‌اند. ثبت‌نام اولیه کمتر از ۱
                            دقیقه زمان می‌برد و نیازی به وارد کردن کارت بانکی
                            نیست.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
                            <a
                                href="#register"
                                className="w-full sm:w-auto font-bold bg-white text-[#1976D2] hover:bg-blue-50 px-8 py-4 rounded-xl transition-all shadow-lg transform hover:-translate-y-0.5"
                            >
                                ثبت‌نام و شروع رایگان
                            </a>
                            <a
                                href="#consultation"
                                className="w-full sm:w-auto font-bold border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl transition-all"
                            >
                                درخواست مشاوره با کارشناسان
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ۱۲- Footer */}
            <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-slate-800 pb-12 mb-12">
                    <div className="col-span-2 space-y-4">
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-8 h-8 rounded-lg bg-[#1976D2] flex items-center justify-center">
                                <AccountBalanceWalletRounded />
                            </div>
                            <span className="text-xl font-bold">
                                نسیه<span className="text-[#1976D2]">.</span>
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                            نسیه، پلتفرم برتر برای مدیریت نسیه، اقساط، طلب‌ها و
                            جریان‌های مالی خرد ویژه اصناف و کسب‌وکار‌های کوچک
                            ایرانی در سال ۲۰۲۶.
                        </p>
                        <div className="flex gap-4 text-base pt-2">
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                <Twitter />
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                <Instagram />
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                <LinkedIn />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
                            امکانات
                        </h5>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    مدیریت مشتریان
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    ثبت فاکتور نسیه
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    یادآور خودکار پیامکی
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    گزارش‌گیری سود و زیان
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
                            منابع
                        </h5>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    تعرفه‌ها
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    وبلاگ آموزشی
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    راهنمای استفاده
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    سوالات متداول
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
                            قوانین و پشتیبانی
                        </h5>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    حریم خصوصی
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    شرایط استفاده
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    تماس با پشتیبانی
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    درباره ما
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <div>
                        © ۲۰۲۶ سامانه مدیریت مالی نسیه. تمامی حقوق برای طراح
                        محفوظ است.
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-slate-400">
                            نقشه سایت
                        </a>
                        <a href="#" className="hover:text-slate-400">
                            امنیت سرور
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NesyehLanding;
