echo "기존에 생성된 이미지가 있다면 삭제합니다"
# 이미지 삭제
docker rmi dynam0507/picker-fe:0.1 || notExistsImage=true

if [ $notExistsImage ]
then
    echo "기존에 생성된 이미지가 없습니다."
fi

echo "이전 프로세스에 대해 이상이 없습니다."
echo "이제 이미지를 만들고 컨테이너를 띄웁니다."

echo `docker build -t dynam0507/picker-fe:0.1 .`
echo `docker login -u dynam0507 -p xxxx`
echo `docker push dynam0507/picker-fe:0.1`