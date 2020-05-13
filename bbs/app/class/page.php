<?php
/**
 * YunPHP4SAE php framework designed for SAE
 *
 * @author heyue <heyue@foxmail.com>
 * @copyright Copyright(C)2010, heyue
 * @link http://code.google.com/p/yunphp4sae/
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 * @version YunPHP4SAE  version 1.0.0
 * @the class is changed from CodeIgniter
 */
class Page {

 
	var $base_url			= ''; // 最基础的url，分页函数在最后加上页码
	var $total_rows  		= ''; // 总数
	var $per_page	 		= 10; // 每页显示的数量
	var $num_links			=  2; // 显示在当前页左右的有几个，比如例子中就是2个
	var $cur_page	 		=  1; // 默认当前页
	
	var $first_link   		= '首页';  //第一页的文字
	var $next_link			= '&gt;';	//下一页的文字
	var $prev_link			= '&lt;'; 	//上一页的文字
	var $last_link			= '尾页'; //最后一页的文字
	
	var $full_tag_open		= '';  //如果你想在page外面包一层div，css的标签请用这个
	var $full_tag_close		= '';  //后标签
	
	var $first_tag_open		= '';  //第一页的左边的div css 标签
	var $first_tag_close	= ''; //第一页右边的div css 标签，下面同
	
	var $last_tag_open		= ''; //最后一页
	var $last_tag_close		= '';
	
	var $cur_tag_open		= '<span class="current">'; //当前页
	var $cur_tag_close		= '</span>';
	
	var $next_tag_open		= ''; //下一页
	var $next_tag_close		= '';
	var $prev_tag_open		= '';
	var $prev_tag_close		= '';
	
	var $num_tag_open		= '<span>'; //总数
	var $num_tag_close		= '</span>';
	
	var $page_tab_open      = ''; //其他不是当前页的页码的div css
	var $page_tab_close 	= '';
	
	var $uri_segmentation = ''; //从配置文件中读取分隔符。本分页函数将在url最后加上页码
	var $page_uri = ''; //标准生成的uri

	var $suffix = '';
	//处理url stu/list/1 /stu-list-2
	function create_links(){
		if($this->total_rows == 0 OR $this->per_page == 0){
			return '';
		}
		$num_pages = ceil($this->total_rows / $this->per_page);
		if($num_pages == 1){
			return '';
		}
				
		$pre_page = $this->cur_page-1;
		$next_page = $this->cur_page +1;
		
		if($this->cur_page >=$num_pages){
			$this->cur_page = $num_pages;
			$next_page = $num_pages;
		}
		if($this->cur_page <= 1){
			$this->cur_page = 1;
			$pre_page = 1;
		}

	$output = '';
	$output .= "$this->full_tag_open";
	$output .= "{$this->first_tag_open}<a href='{$this->base_url}1{$this->suffix}'>$this->first_link</a>{$this->first_tag_close}";
	$output .="{$this->prev_tag_open}<a href='{$this->base_url}{$pre_page}{$this->suffix}'>$this->prev_link</a>{$this->prev_tag_close}";
	$show_nums = $this->num_links*2+1;// 显示页码的个数，比如前后2个，加上自己一个，共 5 个
	if($num_pages <= $show_nums){
		for($i = 1;$i<=$num_pages;$i++){
			if($i == $this->cur_page){
				$output .= $this->cur_tag_open.$i.$this->cur_tag_close;
			}else{
				$output .= "{$this->page_tab_open}<a href='{$this->base_url}$i{$this->suffix}'>$i</a>{$this->page_tab_close}";
			}
		}
	}else{
		if($this->cur_page < (1+$this->num_links)){
			for($i = 1;$i<=$show_nums;$i++){
				if($i == $this->cur_page){
					$output .= $this->cur_tag_open.$i.$this->cur_tag_close;
				}else{
					$output .= "{$this->page_tab_open}<a href='{$this->base_url}$i{$this->suffix}'>$i</a>{$this->page_tab_close}";
				}
			}			
		}else if($this->cur_page >= ($num_pages - $this->num_links)){
			for($i = $num_pages - $show_nums ; $i <= $num_pages ; $i++){
				if($i == $this->cur_page){
					$output .= $this->cur_tag_open.$i.$this->cur_tag_close;
				}else{
					$output .= "{$this->page_tab_open}<a href='{$this->base_url}$i{$this->suffix}'>$i</a>{$this->page_tab_close}";
				}
			}
		}else{
			$start_page = $this->cur_page - $this->num_links;
			$end_page = $this->cur_page + $this->num_links;
			for($i = $start_page ; $i<=$end_page ; $i++){
				if($i == $this->cur_page){
					$output .= $this->cur_tag_open.$i.$this->cur_tag_close;
				}else{
					$output .= "{$this->page_tab_open}<a href='{$this->base_url}$i{$this->suffix}'>$i</a>{$this->page_tab_close}";
				}
			}
		}
	}
	
	$output .="{$this->next_tag_open}<a href='{$this->base_url}{$next_page}{$this->suffix}'>$this->next_link</a>{$this->next_tag_close}";
	$output .= "{$this->last_tag_open}<a href='{$this->base_url}{$num_pages}{$this->suffix}'>$this->last_link</a>{$this->last_tag_close}";
	//$output .="{$this->num_tag_open}$total_rows{$this->num_tag_close}";
	$output .= $this->full_tag_close;	
	return $output;
	}
	/**
	 * Constructor
	 *
	 * @access	public
	 * @param	array	initialization parameters
	 */
	function __construct($params = array())
	{
		$this->uri_segmentation = '';//Configure::getItem('uri_segmentation','config');
		if (count($params) > 0)
		{
			$this->initialize($params);
		}
	}
	/**
	 * 初始化分页函数
	 *
	 * @param unknown_type $params
	 */
	function initialize($params = array()){		 
		if(count($params) > 0){
			foreach ($params as $k => $v){
				if(isset($this->$k)){
					$this->$k = $v;
				}
			}
		}
		if(substr($this->base_url,-1) != $this->uri_segmentation){
			$this->base_url .= $this->uri_segmentation;
		}
	}
	

}
