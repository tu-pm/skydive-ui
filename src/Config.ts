import { Node, Link, NodeAttrs } from './Topology'
import Tools from './Tools'

const WEIGHT_NONE = 0
const WEIGHT_FABRIC = 10
const WEIGHT_FABRIC_LEAF = 11
const WEIGHT_FABRIC_SPINE = 12
const WEIGHT_PHYSICAL = 13
const WEIGHT_BRIDGES = 14
const WEIGHT_PORTS = 15
const WEIGHT_VIRTUAL = 17
const WEIGHT_NAMESPACES = 18
const WEIGHT_VMS = 19
const WEIGHT_K8S_FEDERATION = 100
const WEIGHT_K8S_CLUSTER = 101
const WEIGHT_K8S_NODE = 102
const WEIGHT_K8S_POD = 103
const WEIGHT_TF_DOMAIN = 200
const WEIGHT_TF_PROJECT = 201
const WEIGHT_TF_VIRTUAL_NETWORK = 202
const WEIGHT_TF_SERVICE_INSTANCE = 203

var DefaultConfig = {
    subTitle: "",
    filters: [
        {
            id: "default",
            label: "Default",
            gremlin: ""
        },
        // {
        //     id: "namespaces",
        //     label: "Namespaces",
        //     gremlin: "G.V().Has('Type', 'host').as('host')" +
        //         ".out().Has('Type', 'netns').descendants().as('netns')" +
        //         ".select('host', 'netns').SubGraph()"
        // }
    ],
    defaultFilter: 'default',
    _newAttrs: function (node: Node): NodeAttrs {
        var name = node.data.Name
        if (node.data.Nova) {
            name = node.data.Nova.Name
        }
        if (name.length > 24) {
            name = node.data.Name.substring(0, 24) + "."
        }

        var attrs = {
            classes: [node.data.Type],
            name: name,
            icon: "\uf192",
            href: '',
            iconClass: '',
            weight: 0,
            badges: []
        }

        return attrs
    },
    _nodeAttrsK8s: function (node: Node): NodeAttrs {
        var attrs = this._newAttrs(node)

        switch (node.data.Type) {
            case "cluster":
                attrs.href = "assets/icons/cluster.png"
                attrs.weight = WEIGHT_K8S_CLUSTER
                break
            case "configmap":
                attrs.href = "assets/icons/configmap.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "container":
                attrs.href = "assets/icons/container.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "cronjob":
                attrs.href = "assets/icons/cronjob.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "daemonset":
                attrs.href = "assets/icons/daemonset.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "deployment":
                attrs.href = "assets/icons/deployment.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "endpoints":
                attrs.href = "assets/icons/endpoints.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "ingress":
                attrs.href = "assets/icons/ingress.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "job":
                attrs.href = "assets/icons/job.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "node":
                attrs.icon = "\uf109"
                attrs.weight = WEIGHT_K8S_NODE
                break
            case "persistentvolume":
                attrs.href = "assets/icons/persistentvolume.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "persistentvolumeclaim":
                attrs.href = "assets/icons/persistentvolumeclaim.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "pod":
                attrs.href = "assets/icons/pod.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "networkpolicy":
                attrs.href = "assets/icons/networkpolicy.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "namespace":
                attrs.icon = "\uf24d"
                attrs.weight = WEIGHT_K8S_NODE
                break
            case "replicaset":
                attrs.href = "assets/icons/replicaset.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "replicationcontroller":
                attrs.href = "assets/icons/replicationcontroller.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "secret":
                attrs.href = "assets/icons/secret.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "service":
                attrs.href = "assets/icons/service.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "statefulset":
                attrs.href = "assets/icons/statefulset.png"
                attrs.weight = WEIGHT_K8S_POD
                break
            case "storageclass":
                attrs.href = "assets/icons/storageclass.png"
                attrs.weight = WEIGHT_K8S_NODE
                break
            case "TF-DOMAIN":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_DOMAIN
                break
            case "TF-PROJECT":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_PROJECT
                break
            case "TF-VirtualNetwork":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_VIRTUAL_NETWORK
                break
            case "TF-ServiceInstance":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_SERVICE_INSTANCE
                break
            case "switch":
                attrs.icon = "\uf6ff"
                if (node.data.Name.indexOf("leaf") !== -1) {
                    attrs.weight = WEIGHT_FABRIC_LEAF
                } else if (node.data.Name.indexOf("spine") !== -1) {
                    attrs.weight = WEIGHT_FABRIC_SPINE
                } else {
                    attrs.weight = WEIGHT_FABRIC
                }
                if (node.data && node.data.SNMPState === "DOWN") {
                    attrs.classes.push("down")
                }
                break
            default:
                attrs.href = "assets/icons/k8s.png"
                attrs.weight = WEIGHT_TF_SERVICE_INSTANCE
        }

        return attrs
    },
    _nodeAttrsTF: function (node: Node): NodeAttrs {
        var attrs = this._newAttrs(node)

        switch (node.data.Type) {
            case "TF-Domain":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_DOMAIN
                break
            case "TF-Project":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_PROJECT
                break
            case "TF-VirtualNetwork":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_VIRTUAL_NETWORK
                break
            case "TF-ServiceInstance":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_SERVICE_INSTANCE
                break
            default:
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_TF_SERVICE_INSTANCE
        }

        return attrs
    },
    _nodeAttrsInfra: function (node: Node): NodeAttrs {
        var attrs = this._newAttrs(node)

        if (node.data.OfPort) {
            attrs.weight = WEIGHT_PORTS
        }

        switch (node.data.Type) {
            case "host":
                attrs.icon = "\uf109"
                attrs.weight = WEIGHT_PHYSICAL
                break
            case "switch":
                attrs.icon = "\uf6ff"
                if (node.data.Name.indexOf("leaf") !== -1) {
                    attrs.weight = WEIGHT_FABRIC_LEAF
                } else if (node.data.Name.indexOf("spine") !== -1) {
                    attrs.weight = WEIGHT_FABRIC_SPINE
                } else {
                    attrs.weight = WEIGHT_FABRIC
                }
                if (node.data && node.data.SNMPState === "DOWN") {
                    attrs.classes.push("snmp-down")
                }
                break
            case "bridge":
            case "ovsbridge":
                attrs.icon = "\uf6ff"
                attrs.weight = WEIGHT_BRIDGES
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
                attrs.weight = WEIGHT_VIRTUAL
                break
            case "veth":
                attrs.icon = "\uf4d7"
                attrs.weight = WEIGHT_VIRTUAL
                break
            case "switchport":
                attrs.icon = "\uf0e8"
                break
            case "patch":
            case "port":
            case "ovsport":
                attrs.icon = "\uf0e8"
                attrs.weight = WEIGHT_PORTS
                break
            case "netns":
                attrs.icon = "\uf24d"
                attrs.weight = WEIGHT_NAMESPACES
                break
            case "libvirt":
                attrs.icon = "\uf109"
                attrs.weight = WEIGHT_VMS
                break
        }

        if (node.data.Manager === "docker") {
            attrs.icon = "\uf395"
            attrs.iconClass = "font-brands"
        }

        if (node.data.IPV4 && node.data.IPV4.length) {
            attrs.weight = WEIGHT_PHYSICAL
        }

        if (node.data.Driver && ["tap", "veth", "tun", "openvswitch"].indexOf(node.data.Driver) < 0) {
            attrs.weight = WEIGHT_PHYSICAL
        }

        if (node.data.Probe === "fabric") {
            attrs.weight = WEIGHT_FABRIC
        }

        if (node.data.Captures) {
            attrs.badges = ["\uf03d"]
        }

        return attrs
    },
    nodeAttrs: function (node: Node): NodeAttrs {
        switch (node.data.Manager) {
            case "k8s":
                return this._nodeAttrsK8s(node)
            case "TungstenFabric":
                return this._nodeAttrsTF(node)
            default:
                return this._nodeAttrsInfra(node)
        }
    },
    nodeSortFnc: function (a: Node, b: Node) {
        // First, sort by preference
        var res = b.priority - a.priority
        // Then sort by state
        if (res == 0 && a.data.State && b.data.State) {
            res = (a.data.State === "UP" && b.data.State === "DOWN") ? -1
                : (a.data.State === "DOWN" && b.data.State === "UP") ? 1 : 0
        }
        // Fallback to sort by name
        if (res == 0) {
            res = a.data.Name.localeCompare(b.data.Name)
        }
        return res
    },
    nodeClicked: function (node: Node) {
        window.App.tc.selectNode(node.id)
    },
    nodeDblClicked: function (node: Node) {
        window.App.tc.expand(node)
    },
    nodeMenu: function (node: Node) {
        return [
            {
                class: "", text: "Capture", disabled: false, callback: () => {
                    var api = new window.API.CapturesApi(window.App.apiConf)
                    api.createCapture({ GremlinQuery: `G.V('${node.id}')` }).then(result => {
                        console.log(result)
                    })
                }
            },
            { class: "", text: "Capture all", disabled: true, callback: () => { console.log("Capture all") } },
            { class: "", text: "Injection", disabled: false, callback: () => { console.log("Injection") } },
            { class: "", text: "Flows", disabled: false, callback: () => { console.log("Flows") } },
            { class: "", text: "Filter NS(demo)", disabled: false, callback: () => { window.App.loadExtraConfig("/assets/nsconfig.js") } }
        ]
    },
    nodeTags: function (data) {
        if (data.Manager && data.Manager === "k8s") {
            return ["kubernetes"]
        } else if (data.Manager && data.Manager === "TungstenFabric") {
            return ["tungstenfabric"]
        } else {
            return ["infrastructure"]
        }
    },
    defaultNodeTag: "infrastructure",
    nodeTabTitle: function (node: Node): string {
        return node.data.Name.substring(0, 8)
    },
    groupSize: 3,
    groupType: function (node: Node): string | undefined {
        var nodeType = node.data.Type
        if (!nodeType) {
            return
        }

        switch (nodeType) {
            case "configmap":
            case "cronjob":
            case "daemonset":
            case "deployment":
            case "endpoints":
            case "ingress":
            case "job":
            case "persistentvolume":
            case "persistentvolumeclaim":
            case "pod":
            case "networkpolicy":
            case "replicaset":
            case "replicationcontroller":
            case "secret":
            case "service":
            case "statefulset":
                return "app"
            default:
                return nodeType
        }
    },
    groupName: function (node: Node): string | undefined {
        if (node.data.K8s) {
            var labels = node.data.K8s.Labels
            if (!labels) {
                return name
            }

            var app = labels["k8s-app"] || labels["app"]
            if (!app) {
                return "default"
            }
            return app
        }

        var nodeType = this.groupType(node)
        if (!nodeType) {
            return
        }

        return nodeType + "(s)"
    },
    weightTitles: function () {
        return {
            [WEIGHT_NONE]: "Not classified",
            [WEIGHT_FABRIC]: "Fabric",
            [WEIGHT_FABRIC_LEAF]: "Leaf Switches",
            [WEIGHT_FABRIC_SPINE]: "Spine Switches",
            [WEIGHT_PHYSICAL]: "Physical",
            [WEIGHT_BRIDGES]: "Bridges",
            [WEIGHT_PORTS]: "Ports",
            [WEIGHT_VIRTUAL]: "Virtual",
            [WEIGHT_NAMESPACES]: "Namespaces",
            [WEIGHT_VMS]: "VMs",
            [WEIGHT_K8S_FEDERATION]: "Federations",
            [WEIGHT_K8S_CLUSTER]: "Clusters",
            [WEIGHT_K8S_NODE]: "Nodes",
            [WEIGHT_K8S_POD]: "Pods",
            [WEIGHT_TF_DOMAIN]: "TF Domains",
            [WEIGHT_TF_PROJECT]: "TF Projects",
            [WEIGHT_TF_VIRTUAL_NETWORK]: "TF Networks",
            [WEIGHT_TF_SERVICE_INSTANCE]: "TF Services",
        }
    },
    suggestions: [
        "data.IPV4",
        "data.MAC",
        "data.Name"
    ],
    nodeDataFields: [
        {
            field: "",
            title: "General",
            expanded: true,
            icon: "\uf05a",
            sortKeys: function (data) {
                return ['Name', 'FqName', 'Type', 'MAC', 'Driver', 'State']
            },
            filterKeys: function (data) {
                switch (data.Type) {
                    case "host":
                        return ['Name']
                    case "switch":
                        return ['Name', 'Type', 'SNMPState']
                    case "switchport":
                        return ['Name', 'Type', 'MTU', 'Speed', 'State']
                    default:
                        return ['Name', 'FqName', 'Type', 'MAC', 'Driver', 'State']
                }
            }
        },
        {
            field: "LLDP",
            title: "LLDP Information",
            expanded: false,
            icon: "\uf05a"
        },
        {
            field: "Properties",
            title: "Properties",
            expanded: true,
            icon: "\uf05a"
        },
        {
            field: "Template",
            title: "Template",
            expanded: true,
            icon: "\uf05a"
        },
        {
            field: "Contrail",
            title: "TF Metadata",
            expanded: false,
            icon: "\uf05a"
        },
        {
            field: "Contrail.RoutingTable",
            title: "TF Routing Table",
            expanded: false,
            icon: "\uf05a"
        },
        {
            field: "Tunnels",
            title: "Tunnels",
            expanded: false,
            icon: "\uf05a",
        },
        {
            field: "Neutron",
            title: "Neutron",
            expanded: false,
            icon: "\uf05a"
        },
        {
            field: "Neutron.IPV4",
            title: "IPV4",
            expanded: false,
            icon: "\uf1fa"
        },
        {
            field: "Nova",
            title: "Nova",
            expanded: false,
            icon: "\uf109"
        },
        {
            field: "RBAC",
            title: "RBAC",
            expanded: true,
            icon: "\uf05a"
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
                    RxBytes: data.RxBytes ? Tools.prettyBytes(data.RxBytes) : 0,
                    TxPackets: data.TxPackets ? data.TxPackets.toLocaleString() : 0,
                    TxBytes: data.TxPackets ? Tools.prettyBytes(data.TxBytes) : 0,
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
                        [data.Last ? new Date(data.Last) : new Date(), data.RxBytes || 0, data.TxBytes || 0]
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
                    RxBytes: data.RxBytes ? Tools.prettyBytes(data.RxBytes) : 0,
                    TxPackets: data.TxPackets ? data.TxPackets.toLocaleString() : 0,
                    TxBytes: data.TxPackets ? Tools.prettyBytes(data.TxBytes) : 0,
                    Last: data.Last ? new Date(data.Last).toLocaleString() : 0
                }
            }
        },
        {
            field: "LastUpdateChassisIfMetric",
            title: "Last metrics",
            expanded: false,
            icon: "\uf201",
            normalizer: function (data) {
                return {
                    IfInOctets: data.IfInOctets ? data.IfInOctets.toLocaleString() : 0,
                    IfInUcastPkts: data.IfInUcastPkts ? data.IfInUcastPkts.toLocaleString() : 0,
                    IfOutOctets: data.IfOutOctets ? data.IfOutOctets.toLocaleString() : 0,
                    IfOutUcastPkts: data.IfOutUcastPkts ? data.IfOutUcastPkts.toLocaleString() : 0,
                    Start: data.Start ? new Date(data.Start).toLocaleString() : 0,
                    Last: data.Last ? new Date(data.Last).toLocaleString() : 0,
                    // IfInMulticastPkts: data.IfInMulticastPkts ? data.IfInMulticastPkts.toLocaleString() : 0,
                    // IfInBroadcastPkts: data.IfInBroadcastPkts ? data.IfInBroadcastPkts.toLocaleString() : 0,
                    // IfInDiscards: data.IfInDiscards ? data.IfInDiscards.toLocaleString() : 0,
                    // IfInErrors: data.IfInErrors ? data.IfInErrors.toLocaleString() : 0,
                    // IfInUnknownProtos: data.IfInUnknownProtos ? data.IfInUnknownProtos.toLocaleString() : 0,
                    // IfOutMulticastPkts: data.IfOutMulticastPkts ? data.IfOutMulticastPkts.toLocaleString() : 0,
                    // IfOutBroadcastPkts: data.IfOutBroadcastPkts ? data.IfOutBroadcastPkts.toLocaleString() : 0,
                    // IfOutDiscards: data.IfOutDiscards ? data.IfOutDiscards.toLocaleString() : 0,
                    // IfOutErrors: data.IfOutErrors ? data.IfOutErrors.toLocaleString() : 0,
                }
            },
            graph: function (data) {
                return {
                    type: "LineChart",
                    data: [
                        [
                            { type: "datetime", label: "time" },
                            "IfInOctets",
                            "IfOutOctets"
                        ],
                        [new Date(data.Last || 0), data.IfInOctets || 0, data.IfOutOctets || 0]
                    ]
                }
            }
        },
        {
            field: "ChassisIfMetric",
            title: "Total metrics",
            expanded: false,
            icon: "\uf201",
            normalizer: function (data) {
                return {
                    IfInOctets: data.IfInOctets ? data.IfInOctets.toLocaleString() : 0,
                    IfInUcastPkts: data.IfInUcastPkts ? data.IfInUcastPkts.toLocaleString() : 0,
                    IfOutOctets: data.IfOutOctets ? data.IfOutOctets.toLocaleString() : 0,
                    IfOutUcastPkts: data.IfOutUcastPkts ? data.IfOutUcastPkts.toLocaleString() : 0,
                    Start: data.Start ? new Date(data.Start).toLocaleString() : 0,
                    Last: data.Last ? new Date(data.Last).toLocaleString() : 0,
                    // IfInMulticastPkts: data.IfInMulticastPkts ? data.IfInMulticastPkts.toLocaleString() : 0,
                    // IfInBroadcastPkts: data.IfInBroadcastPkts ? data.IfInBroadcastPkts.toLocaleString() : 0,
                    // IfInDiscards: data.IfInDiscards ? data.IfInDiscards.toLocaleString() : 0,
                    // IfInErrors: data.IfInErrors ? data.IfInErrors.toLocaleString() : 0,
                    // IfInUnknownProtos: data.IfInUnknownProtos ? data.IfInUnknownProtos.toLocaleString() : 0,
                    // IfOutMulticastPkts: data.IfOutMulticastPkts ? data.IfOutMulticastPkts.toLocaleString() : 0,
                    // IfOutBroadcastPkts: data.IfOutBroadcastPkts ? data.IfOutBroadcastPkts.toLocaleString() : 0,
                    // IfOutDiscards: data.IfOutDiscards ? data.IfOutDiscards.toLocaleString() : 0,
                    // IfOutErrors: data.IfOutErrors ? data.IfOutErrors.toLocaleString() : 0,
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
                var rows = new Array<any>()
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
    linkAttrs: function (link: Link) {
        var attrs = { classes: [link.data.RelationType], icon: "\uf362", directed: false, href: '', iconClass: '' }

        if (link.data.Directed) {
            attrs.directed = true
        }

        return attrs
    },
    linkTabTitle: function (link: Link) {
        var src = link.source.data.Name
        var dst = link.target.data.Name
        if (src && dst) {
            return src.substring(0, 8) + " / " + dst.substring(0, 8)
        }
        return link.id.split("-")[0]
    },
    linkDataFields: [
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
        }
    ],
    defaultLinkTagMode: function (tag: string): number {
        return 2
    }
}

export default DefaultConfig
