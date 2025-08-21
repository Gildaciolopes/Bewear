const Footer = () => {
  return (
    <div className="bg-accent w-full gap-1 p-8">
      <p className="text-xs font-medium">© 2025 Copyright BEWEAR</p>
      <p className="text-muted-foreground text-xs font-medium">
        Desenvolvido por{" "}
        <span className="font-bold text-[#8162FF] hover:cursor-pointer">
          <a href="https://gildaciolopes.netlify.app/" target="_blank">
            Gildácio Lopes
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
