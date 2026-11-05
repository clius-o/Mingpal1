#!/usr/bin/env bash
# Downloads the Figma assets used by the core screens into assets/figma/.
# Source: Figma file hh7ZlihbABvtoYeUifdKpG (core 8 screens v3). Needs access to www.figma.com.
# NOTE: these asset URLs are temporary (7 days, issued 2026-11-05). If they expired, re-run Figma MCP
# get_design_context for each screen (284:5683, 5833, 5897, 5957, 6014, 6053, 6125, 6167) and refresh the URLs.
set -u
cd "$(dirname "$0")/../assets/figma"
dl() { curl -fsSL -o "$1" "$2" && echo "ok   $1" || echo "FAIL $1"; }
B=https://www.figma.com/api/mcp/asset
dl dot-new.svg          $B/86477920-ab30-4a2b-a939-d83fae564f32.svg
dl avatar-maya.png      $B/7e8e307f-1f36-4461-9675-b26e7284f161.png
dl avatar-lena.png      $B/6b5c4c1b-909e-4833-a5db-8aaed53d9ed7.png
dl avatar-amara.png     $B/3f458d9e-1327-4449-b537-89a470f362ac.png
dl avatar-kenji.png     $B/8cc64520-4166-45a2-9713-124225b9293b.png
dl stamp-olive.png      $B/b8a87e85-7949-4d05-9046-fe48f0395d93.png
dl icon-pencil.svg      $B/fafbb0dd-9e9e-419d-a7ff-5e5733362873.svg
dl icon-mail-on.svg     $B/ff9204eb-e328-4236-9ad1-372c93f81228.svg
dl icon-search-off.svg  $B/3b0bfe43-3a4d-468e-a066-0ae83a43dfce.svg
dl icon-book-off.svg    $B/a420b35e-5f9e-435a-8315-18d42050dc31.svg
dl icon-user-off.svg    $B/300e6cfd-439d-4462-bd66-3fa547a805c0.svg
dl icon-mail-off.svg    $B/522a387d-eb22-4a6f-89a7-9154be90ce58.svg
dl icon-book-on.svg     $B/4d7f4123-5c82-42b7-a545-c2125e4d809a.svg
dl icon-back.svg        $B/9d6c4a79-2030-4894-b7d9-20555b97706e.svg
dl icon-more.svg        $B/9f7dd798-ecfd-4502-b982-db4418a49eb1.svg
dl envelope.png         $B/7871e020-5852-4a73-9a2c-6d8556026c9e.png
dl clip3-back.png       $B/0c1abe61-4671-450c-a8d6-58503ae4f80f.png
dl sheet.png            $B/9f4a3d2a-98ae-4be7-9ffe-28f1c9ab877b.png
dl clip3-front.png      $B/a5b14a7e-808d-4737-b7d3-f2a4c88820d1.png
dl stamp-olive-lt01.png $B/dedbae41-ed88-431c-8f6d-875659d7c416.png
dl postmark.png         $B/4edd132d-36b7-4b52-9973-01ce1031a8a3.png
dl stamp-portugal.png   $B/d7257b26-e07b-4afe-9d12-968dd37d7dd1.png
dl icon-pen-write.svg   $B/580b9ad8-3843-43e3-8475-a8a8f64da8cf.svg
dl ill-pen.png          $B/0d3c6eb4-8014-4e59-90dd-773c9c07abad.png
dl stamp-seoul.png      $B/75805c15-e980-4116-a258-53b06cdd5bb1.png
dl icon-pen.svg         $B/6dfbd597-f5bb-441b-bcb7-139fbb8d69c4.svg
dl icon-close.svg       $B/14e6b25d-8ce2-4599-a8d9-14ae22f2949b.svg
dl radio-on.svg         $B/726508e8-5204-4456-ae09-fccc36d1d0ce.svg
dl radio-on-dot.svg     $B/fcf8136e-3879-49af-8062-c4bce03d5e44.svg
dl radio-off.svg        $B/5967d4bd-8a3f-4a30-a577-0cb76320641e.svg
dl icon-undo.svg        $B/2a7ac586-cb54-4578-b426-b07fe2ad9ca5.svg
dl icon-chevron.svg      $B/89290cf5-7c1b-4262-95f6-fe6f701340ac.svg
dl avatar-jiyoon.png    $B/9e96c41c-6afa-410e-9462-6ce6254c02e9.png
dl avatar-lukas.png     $B/60b994a4-a294-4569-85df-aa345e917b1e.png
dl ill-plus.png         $B/0e828a03-0fb7-497d-b791-1e2828760086.png
