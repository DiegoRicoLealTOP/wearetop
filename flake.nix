{
  description = "wearetop dev environment (Astro + Svelte)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {nixpkgs, ...}: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs_25
        nodePackages.pnpm
        git
        curl
        unzip
      ];

      shellHook = ''
        echo "Node: $(node --version)"
        echo "pnpm: $(pnpm --version)"
      '';
    };
  };
}
