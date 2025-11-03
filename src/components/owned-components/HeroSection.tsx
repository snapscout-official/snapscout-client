const HeroSection = () => {
    return (
        <div className="flex flex-col justify-center items-start max-w-2xl px-8">
            <p className="text-accent text-lg font-medium mb-6 tracking-wide w-full text-center">
                Your go-to marketplace
            </p>

            <h1 className="text-white text-6xl w-full md:text-7xl font-bold leading-tight mb-8 text-center">
                Canvassing<br />Made Easy
            </h1>

            <p className="text-white/80 text-lg leading-relaxed max-w-xl text-center">
                Forget scrolling through endless online reviews or sifting through online posts - SnapScout puts the power of convenience at your fingertips, letting you find the best product or service quickly and effortlessly.
            </p>
        </div>
    );
};

export default HeroSection;
