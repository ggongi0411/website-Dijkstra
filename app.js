// Kakao Map 설정
let mapContainer = document.getElementById('map');
let mapOptions = {
    center: new kakao.maps.LatLng(37.508882, 127.100055), // 롯데월드 매직아일랜드 대략적 위치
    level: 1
};
let map = new kakao.maps.Map(mapContainer, mapOptions);

// 어트랙션 데이터
let attractions = {
    "아틀란티스": new kakao.maps.LatLng(37.508893, 127.099136),
    "자이로스윙": new kakao.maps.LatLng(37.508327, 127.099720),
    "범퍼카": new kakao.maps.LatLng(37.508555, 127.100226),
    "월드모노레일": new kakao.maps.LatLng(37.508415, 127.100330),
    "자이로드롭": new kakao.maps.LatLng(37.508721, 127.100525),
    "환타지드림": new kakao.maps.LatLng(37.508898, 127.100447),
    "혜성특급": new kakao.maps.LatLng(37.509114, 127.100623),
    "자이로스핀": new kakao.maps.LatLng(37.509283, 127.100647),
    "회전그네": new kakao.maps.LatLng(37.509332, 127.100351),
    "번지드롭": new kakao.maps.LatLng(37.509296, 127.100098)
};

// 거리 데이터 (어트랙션 간 거리)
let distances = {
    "아틀란티스": {
        "자이로스윙": 5,
        "범퍼카": 8,
        "월드모노레일": 9,
        "자이로드롭": 9.5,
        "환타지드림": 8,
        "혜성특급": 10,
        "자이로스핀": 10.5,
        "회전그네": 8,
        "번지드롭": 7
    },
    "자이로스윙": {
        "아틀란티스": 5,
        "범퍼카": 4,
        "월드모노레일": 4.5,
        "자이로드롭": 6,
        "환타지드림": 6,
        "혜성특급": 7.5,
        "자이로스핀": 10,
        "회전그네": 8,
        "번지드롭": 8.5
    },
    "범퍼카": {
        "아틀란티스": 8,
        "자이로스윙": 4,
        "월드모노레일": 1.5,
        "자이로드롭": 1.5,
        "환타지드림": 2.5,
        "혜성특급": 4.5,
        "자이로스핀": 5.5,
        "회전그네": 5.5,
        "번지드롭": 6
    },
    "월드모노레일": {
        "아틀란티스": 9,
        "자이로스윙": 4.5,
        "범퍼카": 1.5,
        "자이로드롭": 2,
        "환타지드림": 3,
        "혜성특급": 4.5,
        "자이로스핀": 6,
        "회전그네": 6,
        "번지드롭": 7
    },
    "자이로드롭": {
        "아틀란티스": 9.5,
        "자이로스윙": 6,
        "범퍼카": 1.5,
        "월드모노레일": 2,
        "환타지드림": 1.5,
        "혜성특급": 3,
        "자이로스핀": 4,
        "회전그네": 4,
        "번지드롭": 5
    },
    "환타지드림": {
        "아틀란티스": 8,
        "자이로스윙": 6,
        "범퍼카": 2.5,
        "월드모노레일": 3,
        "자이로드롭": 1.5,
        "혜성특급": 2.5,
        "자이로스핀": 4,
        "회전그네": 3.5,
        "번지드롭": 4
    },
    "혜성특급": {
        "아틀란티스": 10,
        "자이로스윙": 7.5,
        "범퍼카": 4.5,
        "월드모노레일": 4.5,
        "자이로드롭": 3,
        "환타지드림": 2.5,
        "자이로스핀": 1,
        "회전그네": 2.5,
        "번지드롭": 4
    },
    "자이로스핀": {
        "아틀란티스": 10.5,
        "자이로스윙": 10,
        "범퍼카": 5.5,
        "월드모노레일": 6,
        "자이로드롭": 4,
        "환타지드림": 4,
        "혜성특급": 1,
        "회전그네": 1.5,
        "번지드롭": 3.5
    },
    "회전그네": {
        "아틀란티스": 8,
        "자이로스윙": 8,
        "범퍼카": 5.5,
        "월드모노레일": 6,
        "자이로드롭": 4,
        "환타지드림": 3.5,
        "혜성특급": 2.5,
        "자이로스핀": 1.5,
        "번지드롭": 1.5
    },
    "번지드롭": {
        "아틀란티스": 7,
        "자이로스윙": 8.5,
        "범퍼카": 6,
        "월드모노레일": 7,
        "자이로드롭": 5,
        "환타지드림": 4,
        "혜성특급": 4,
        "자이로스핀": 3.5,
        "회전그네": 1.5
    }
};

// 사용자 선택 장소 배열
let selectedAttractions = [];

// 각 장소에 마커 추가 및 클릭 이벤트 설정
Object.keys(attractions).forEach(name => {
    let marker = new kakao.maps.Marker({
        position: attractions[name],
        map: map,
        title: name
    });

    // 마커 클릭 이벤트 추가 (선택한 어트랙션 추가)
    kakao.maps.event.addListener(marker, 'click', function() {
        if (!selectedAttractions.includes(name)) {
            selectedAttractions.push(name);
            marker.setImage(new kakao.maps.MarkerImage('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', new kakao.maps.Size(64, 69))); // 선택한 마커 색상 변경
        } else {
            // 선택 해제 기능
            selectedAttractions = selectedAttractions.filter(attraction => attraction !== name);
            marker.setImage(new kakao.maps.MarkerImage('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker.png', new kakao.maps.Size(64, 69))); // 기본 색상으로 변경
        }
    });
});

// 최단 경로 계산 함수
function calculatePath() {
    // 선택한 장소가 없으면 종료
    if (selectedAttractions.length < 2) {
        alert("두 개 이상의 어트랙션을 선택하세요.");
        return;
    }

    // 최단 경로를 계산하기 위한 기본 설정
    let minDistance = Infinity;
    let bestPath = [];

    // 모든 조합을 통해 최단 경로 찾기
    function findShortestPath(path, remaining) {
        if (remaining.length === 0) {
            let distance = calculateDistance(path);
            if (distance < minDistance) {
                minDistance = distance;
                bestPath = path.slice();
            }
            return;
        }
        for (let i = 0; i < remaining.length; i++) {
            let nextPath = path.slice();
            nextPath.push(remaining[i]);
            let nextRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            findShortestPath(nextPath, nextRemaining);
        }
    }

    // 거리 계산 함수
    function calculateDistance(path) {
        let total = 0;
        for (let i = 0; i < path.length - 1; i++) {
            total += distances[path[i]][path[i + 1]];
        }
        return total;
    }

    // 선택한 장소들의 모든 조합을 탐색
    findShortestPath([], selectedAttractions);

    // 경로 표시
    let pathCoords = bestPath.map(attraction => attractions[attraction]);
    let linePath = new kakao.maps.Polyline({
        path: pathCoords,
        strokeWeight: 5,
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeStyle: 'solid'
    });

    linePath.setMap(map);
    alert("최단 경로가 계산되었습니다.");
}

// 경로 계산 버튼 클릭 이벤트 설정
document.getElementById('calculatePathBtn').addEventListener('click', calculatePath);
