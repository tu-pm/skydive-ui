var config = {
    "nodeAttrs": function (node) {
        console.log(node.data)
        var name = node.data.Name
        if (name.length > 24) {
            name = node.data.Name.substring(0, 24) + "."
        }

        var attrs = { classes: [node.data.Type], name: name, icon: "\uf192", iconClass: '', weight: 0 }

        if (node.data.OfPort) {
            attrs.weight = 15
        }

        if (node.data.Manager === "k8s") {
            attrs.icon = "/assets/icons/k8s.png"
            attrs.weight = 1
        }

        switch (node.data.Type) {
            case "data_center":
                attrs.icon = "\uf109"
                attrs.weight = 2
                break
            case "host":
                attrs.icon = "\uf109"
                attrs.weight = 3
                break
            case "vm":
                attrs.icon = "\uf109"
                attrs.weight = 4
                break
            case "application":
                attrs.icon = "\uf109"
                attrs.weight = 5
                break
            case "switch":
                attrs.icon = "\uf6ff"
                break
            case "bridge":
            case "ovsbridge":
                attrs.icon = "\uf6ff"
                attrs.weight = 14
                break
            case "erspan":
                attrs.icon = "\uf1e0"
                break
            case "geneve":
            case "vxlan":
            case "gre":
            case "gretap":
                attrs.icon = "\uf55b"
                break
            case "device":
            case "internal":
            case "interface":
            case "tun":
            case "tap":
                attrs.icon = "\uf796"
                attrs.weight = 17
                break
            case "veth":
                attrs.icon = "\uf4d7"
                attrs.weight = 17
                break
            case "switchport":
                attrs.icon = "\uf0e8"
                break
            case "patch":
            case "port":
            case "ovsport":
                attrs.icon = "\uf0e8"
                attrs.weight = 15
                break
            case "netns":
                attrs.icon = "\uf24d"
                attrs.weight = 18
                break
            case "libvirt":
                attrs.icon = "\uf109"
                attrs.weight = 19
                break
            case "cluster":
                attrs.icon = "/assets/icons/cluster.png"
                break
            case "configmap":
                attrs.icon = "/assets/icons/configmap.png"
                break
            case "container":
                attrs.icon = "/assets/icons/container.png"
                break
            case "cronjob":
                attrs.icon = "/assets/icons/cronjob.png"
                break
            case "daemonset":
                attrs.icon = "/assets/icons/daemonset.png"
                break
            case "deployment":
                attrs.icon = "/assets/icons/deployment.png"
                break
            case "endpoints":
                attrs.icon = "/assets/icons/endpoints.png"
                break
            case "ingress":
                attrs.icon = "/assets/icons/ingress.png"
                break
            case "job":
                attrs.icon = "/assets/icons/job.png"
                break
            case "node":
                attrs.icon = "\uf109"
                break
            case "persistentvolume":
                attrs.icon = "/assets/icons/persistentvolume.png"
                break
            case "persistentvolumeclaim":
                attrs.icon = "/assets/icons/persistentvolumeclaim.png"
                break
            case "pod":
                attrs.icon = "/assets/icons/pod.png"
                break
            case "networkpolicy":
                attrs.icon = "/assets/icons/networkpolicy.png"
                break
            case "namespace":
                attrs.icon = "\uf24d"
                break
            case "replicaset":
                attrs.icon = "/assets/icons/replicaset.png"
                break
            case "replicationcontroller":
                attrs.icon = "/assets/icons/replicationcontroller.png"
                break
            case "secret":
                attrs.icon = "/assets/icons/secret.png"
                break
            case "service":
                attrs.icon = "/assets/icons/service.png"
                break
            case "statefulset":
                attrs.icon = "/assets/icons/statefulset.png"
                break
            case "storageclass":
                attrs.icon = "/assets/icons/storageclass.png"
                break
            default:
                attrs.icon = "\uf192"
                break
        }

        if (node.data.Manager === "docker") {
            attrs.icon = "\uf395"
            attrs.iconClass = "font-brands"
        }

        if (node.data.IPV4 && node.data.IPV4.length) {
            attrs.weight = 13
        }

        if (node.data.Driver && ["tap", "veth", "tun", "openvswitch"].indexOf(node.data.Driver) < 0) {
            attrs.weight = 13
        }

        if (node.data.Probe === "fabric") {
            attrs.weight = 10
        }

        return attrs
    },
    "nodeTags": function (data) {
        switch (data.Type) {
            case "VLAN":
                return ["logical"]
            case "tenant":
                return ["logical"]
            default:
                return ["physical"]
        }
    },
    "defaultNodeTag": "physical",
    "nodeTabTitle": function (node) {
        return node.data.Name.substring(0, 8)
    },
    groupSize: 10,
    "groupBy": function (node) {
        return node.data.Type && node.data.Type !== "host" ? node.data.Type : null
    },
    "weightTitles": {
        0: "Not classified",
        1: "Kubernetes",
        2: "data_center",
        3: "host",
        4: "vm",
        5: "application",
        10: "Fabric",
        13: "Physical",
        14: "Bridges",
        15: "Ports",
        17: "Virtual",
        18: "Namespaces",
        19: "VMs"
    },
    "suggestions": [
        "data.IPV4",
        "data.MAC",
        "data.Name"
    ],
    "nodeDataFields": [
        {
            field: "",
            title: "General",
            expanded: true,
            icon: "\uf05a",
            sortKeys: function (data) {
                return ['Name', 'Type', 'MAC', 'Driver', 'State']
            },
            filterKeys: function (data) {
                switch (data.Type) {
                    case "host":
                        return ['Name']
                    default:
                        return ['Name', 'Type', 'MAC', 'Driver', 'State']
                }
            }
        },
        {
            field: "Sockets",
            expanded: false,
            icon: "\uf1e6"
        },
        {
            field: "Captures",
            expanded: false,
            icon: "\uf51f",
            normalizer: function (data) {
                for (let capture of data) {
                    capture.ID = capture.ID.split('-')[0]
                }
                return data
            }
        },
        {
            field: "Injections",
            expanded: false,
            icon: "\uf48e"
        },
        {
            field: "Docker",
            expanded: false,
            icon: "\uf395",
            iconClass: "font-brands"
        },
        {
            field: "IPV4",
            expanded: true,
            icon: "\uf1fa"
        },
        {
            field: "IPV6",
            expanded: true,
            icon: "\uf1fa"
        },
        {
            field: "LastUpdateMetric",
            title: "Last metrics",
            expanded: false,
            icon: "\uf201",
            normalizer: function (data) {
                return {
                    RxPackets: data.RxPackets ? data.RxPackets.toLocaleString() : 0,
                    RxBytes: data.RxBytes ? prettyBytes(data.RxBytes) : 0,
                    TxPackets: data.TxPackets ? data.TxPackets.toLocaleString() : 0,
                    TxBytes: data.TxPackets ? prettyBytes(data.TxBytes) : 0,
                    Start: data.Start ? new Date(data.Start).toLocaleString() : 0,
                    Last: data.Last ? new Date(data.Last).toLocaleString() : 0
                }
            },
            graph: function (data) {
                return {
                    type: "LineChart",
                    data: [
                        [
                            { type: "datetime", label: "time" },
                            "RxBytes",
                            "TxBytes"
                        ],
                        [new Date(data.Last || 0), data.RxBytes || 0, data.TxBytes || 0]
                    ]
                }
            }
        },
        {
            field: "Metric",
            title: "Total metrics",
            expanded: false,
            icon: "\uf201",
            normalizer: function (data) {
                return {
                    RxPackets: data.RxPackets ? data.RxPackets.toLocaleString() : 0,
                    RxBytes: data.RxBytes ? prettyBytes(data.RxBytes) : 0,
                    TxPackets: data.TxPackets ? data.TxPackets.toLocaleString() : 0,
                    TxBytes: data.TxPackets ? prettyBytes(data.TxBytes) : 0,
                    Last: data.Last ? new Date(data.Last).toLocaleString() : 0
                }
            }
        },
        {
            field: "Features",
            expanded: false,
            icon: "\uf022"
        },
        {
            field: "FDB",
            expanded: false,
            icon: "\uf0ce"
        },
        {
            field: "Neighbors",
            expanded: false,
            icon: "\uf0ce"
        },
        {
            field: "RoutingTables",
            title: "Routing tables",
            expanded: false,
            icon: "\uf0ce",
            normalizer: function (data) {
                var rows = []
                for (let table of data) {
                    if (!table.Routes) {
                        continue
                    }
                    for (let route of table.Routes) {
                        if (!route.NextHops) {
                            continue
                        }
                        for (let nh of route.NextHops) {
                            rows.push({
                                ID: table.ID,
                                Src: table.Src,
                                Protocol: route["Protocol"],
                                Prefix: route["Prefix"],
                                Priority: nh["Priority"],
                                IP: nh["IP"],
                                IfIndex: nh["IfIndex"]
                            })
                        }
                    }
                }

                return rows
            }
        }
    ],
    "linkAttrs": function (link) {
        var attrs = { classes: [link.data.RelationType], icon: "\uf362", directed: false }

        if (link.data.Directed) {
            attrs.directed = true
        }

        return attrs
    },
    "linkTabTitle": function (link) {
        var src = link.source.data.Name
        var dst = link.target.data.Name
        if (src && dst) {
            return src.substring(0, 8) + " / " + dst.substring(0, 8)
        }
        return link.id.split("-")[0]
    },
    "linkDataFields": [
        {
            field: "",
            title: "General",
            expanded: true,
            icon: "\uf05a",
        },
        {
            field: "NSM",
            title: "Network Service Mesh",
            expanded: true,
            icon: "\uf542",
        },
        {
            field: "NSM.Source",
            title: "Source",
            expanded: false,
            icon: "\uf018",
        },
        {
            field: "NSM.Via",
            title: "Via",
            expanded: false,
            icon: "\uf018",
        },
        {
            field: "NSM.Destination",
            title: "Destination",
            expanded: false,
            icon: "\uf018",
        },
    ]
}