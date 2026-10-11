#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p dist/cv
tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT

build() {
    lang="$1"
    TEXINPUTS="./cv//:" \
    pdflatex \
        -interaction=nonstopmode \
        -halt-on-error \
        -output-directory="${tmpdir}" \
        "cv/${lang}.tex"
    mv "$tmpdir/$lang.pdf" dist/cv/
}

build "ru"
build "en"
