//通过一些根据属性名称对应的标记定义模板
var _TreeProvice = [
      '{{#Province}}<h1 class="l1 button gray">{{ProvinceName}}</h1>',
      '<div class="slist">',
           '{{#TreeMsite}}<h2 class="l2  button gray"><a href="#">{{AreasName}}</a></h2>',
           ' <ul class="sslist">',
           '{{#Mistes}}<li class="l3"><a href="#">{{MsiteName}}</a></li>{{/Mistes}}',
           '</ul>{{/TreeMsite}}',
           '</div>{{/Province}}'
      
].join('');
var Old_AdminTree = [

    '<ul>{{#Province}}<li><span><i class="icon-plus-sign"></i>{{ProvinceName}}</span>',
    '<a href="javascript:;" onclick="DeleteProince({{ProvinceID}})"> <strong class="icon-Delete"></strong>删除</a>',
    '<a href="javascript:;" class="AddAreas"  onclick="AddAreas({{ProvinceID}})">',
    '<strong class="icon-Add"></strong>增加{{ProvinceName}}下区县</a>',
    '<ul>',
                   '{{#TreeMsite}}<li><span><i class="icon-plus-sign"></i> {{AreasName}}</span>',
                   ' <button type="button" class="btn btn-warning" " onclick="DeleteAreas({{AreaSID}})"><strong class="icon-Delete"></strong> 删除</button>',
                  ' <button type="button" class="btn btn-danger" onclick="DeleteAreas({{AreaSID}})"><strong class="icon-Add"></strong>此区县下添加测站</button>',
                    //'<a href="javascript:;" onclick="DeleteAreas({{AreaSID}})"> <strong class="icon-Delete"></strong>此区县下添加测站</a>',
                    '',
                   '<ul>',

                                '{{#Mistes}}<li><span><i class="icon-leaf"></i>{{MsiteName}}</span> <a href="javascript:;" onclick="DeleteMsite({{MsiteID}})"> <strong class="icon-Delete"></strong>删除</a></li>{{/Mistes}}',

                      '</ul></li>{{/TreeMsite}}',


                '</ul></li>{{/Province}}</ul>',
                '<script>$(document).ready(function (){',
                '$(".AddAreas").editable({type:"text",pk: 1,url: "/post",title: "Enter username"});',
                '})</script>'

].join('');
var _AdminTree = [
     
    '<ul>{{#Province}}<li><span><i class="icon-plus-sign"></i>{{ProvinceName}}</span>',
    '<a href="{{ProvinceID}}" class="DeleteProince" data-title="真要删除{{ProvinceName}}吗？" data-content="{{ProvinceID}}" role="button"><strong class="icon-Delete"></strong>删除</a>',
    '<a href="javascript:;" class="AddAreas" data-pk="{{ProvinceID}}" data-url="../ashx/Areas/AddAreas.ashx" data-title="增加{{ProvinceName}}下区县">',
    '<strong class="icon-Add"></strong>增加{{ProvinceName}}下区县</a>',
    '<ul>',
                   '{{#TreeMsite}}<li><span><i class="icon-plus-sign"></i> {{AreasName}}</span>',
                   ' <button type="button" class="btn btn-warning"  onclick=DeleteAreas("{{AreaSID}}","{{AreasName}}")><strong class="icon-Delete"></strong> 删除{{AreasName}}</button>',
                  ' <button type="button" class="btn btn-danger AddMsite" data-pk="{{AreaSID}}" data-url="../ashx/Msite/AddMsite.ashx"><strong class="icon-Add"></strong>此区县下添加测站</button>',
                    //'<a href="javascript:;" onclick="DeleteAreas({{AreaSID}})"> <strong class="icon-Delete"></strong>此区县下添加测站</a>',
                    '',
                   '<ul>',

                                '{{#Mistes}}<li><span><i class="icon-leaf"></i>{{MsiteName}}</span> <a href="javascript:;" onclick="DeleteMsite({{MsiteID}})"> <strong class="icon-Delete"></strong>删除</a></li>{{/Mistes}}',
                            
                      '</ul></li>{{/TreeMsite}}',
                       
                    
                '</ul></li>{{/Province}}</ul>'
                //'<script>$(document).ready(function (){',
                //'$(".AddAreas").editable({ display: false});',
                //'})</script>'

].join('');

//初始化这个模板
Mustache.parse(_TreeProvice);
Mustache.parse(_AdminTree);
function data2Html(data) {
    console.log("yes,begin")
    //data = data || [];
    //var curSysAry = data.filter(function (s) { return s.isCurrent; });
    //data.sort(function (a, b) { return a.sortOrder - b.sortOrder; });
    //data = data.map(function (s, i) { s.first = i == 0; return s });

    //模板渲染成字符串
    return Mustache.render(_AdminTree, data);
}